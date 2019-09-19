---
title: "NGINX with HTTPS for those in a hurry"
date: 2019-01-23T23:03:18+03:00
featured_image: "/images/posts/container-lock.jpg"
summary: "We will be using the official letsencrypt Docker image to issue and renew SSL certificates with minimum effort."
tags: ["web", "nginx", "security"]
toc: true
sharethis: true
---

## Prerequisites

* [Installed Docker](https://docs.docker.com/install/)
* Basic [NGINX](https://www.nginx.com/resources/glossary/nginx/) knowledge

## TL;DR

We will be using the official letsencrypt Docker [image](https://hub.docker.com/r/certbot/certbot) to issue and renew SSL certificates with minimum effort. All the steps are performed on virtual server with Ubuntu 18.04.

Create letsencrypt certificate:
{{< highlight bash >}}
docker run -it --rm \
  -p 443:443 -p 80:80 \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/log/letsencrypt:/var/log/letsencrypt \
  certbot/certbot certonly --standalone
{{< / highlight >}}

Update your NGINX config (replace `mydomain.com` with your domain):
{{< highlight nginx >}}
server {
  listen 443 ssl default_server;

  ssl_certificate /etc/letsencrypt/live/mydomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mydomain.com/privkey.pem;

  # The rest of your config...
}
{{< / highlight >}}

Renew certificate if needed:
{{< highlight bash >}}
docker run -it --rm \
  -p 443:443 -p 80:80 \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/log/letsencrypt:/var/log/letsencrypt \
  certbot/certbot renew
{{< / highlight >}}

That's it, we're done!

## Explanation

First, let's break down the Docker command. 

Execute a command in a container. The options tell Docker to run container interactively (`-it`) and remove the container after the command has finished (`--rm`).
{{< highlight bash >}}
docker run -it --rm
{{< / highlight >}}

Map port 443 (HTTPS) and 80 (HTTP) from the container into the host machine. It is required to perform the URL challenge (more on that later).
{{< highlight bash >}}
-p 443:443 -p 80:80
{{< / highlight >}}

Mount `/etc/letsencrypt` and `/var/log/letsencrypt` directories from the container into the host machine. The container will generate the certificate and logs in those directories.
{{< highlight bash >}}
-v /etc/letsencrypt:/etc/letsencrypt
-v /var/log/letsencrypt:/var/log/letsencrypt
{{< / highlight >}}

This is the name of the Docker image from Docker hub provided by Letsencrypt.
{{< highlight bash >}}
certbot/certbot
{{< / highlight >}}

To obtain a certificate we use the `certonly` command. The `--standalone` option tells certbot to run a temporary web server. This server will respond to the request sent by letsencrypt. It's required to confirm your domain and IP.
{{< highlight bash >}}
certonly --standalone
{{< / highlight >}}

After running this command you will be prompted to provide your email address and agree to the terms of service. After doing so, you will see something like this:
{{< highlight text >}}
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/example.com/fullchain.pem. Your cert will
   expire on 2017-10-23. To obtain a new or tweaked version of this
   certificate in the future, simply run certbot again with the
   "certonly" option. To non-interactively renew *all* of your
   certificates, run "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
{{< / highlight >}}

Now you can use your certificate until it expires (currently 3 months). When that happens, you need to renew it by running `renew` command the same way.

## Further improvements

To redirect all HTTP requests to HTTPS you can add this to your NGINX config file (notice that redirect is inside additional `server` directive): 
{{< highlight nginx >}}
server {
  listen 80;
  return 301 https://$server_name$request_uri;
}

server {
  # your SSL server config here.
}
{{< / highlight >}}

We can enable auto renewal by putting the renew command in a [crontab](https://en.wikipedia.org/wiki/Cron) to run it every month. 
Open crontab file by running:

{{< highlight bash >}}
crontab -e
{{< / highlight >}}

Then add this to the file and save it:
{{< highlight bash >}}
0 0 1 * * docker run -it --rm -p 443:443 -p 80:80 -v /etc/letsencrypt:/etc/letsencrypt -v /var/log/letsencrypt:/var/log/letsencrypt certbot/certbot renew &> /var/log/certbot/renew.log
{{< / highlight >}}

Renewal logs will be available at `/var/log/certbot/renew.log` file. 

**Important:** If your server is running on 80 or 443 ports, the renewal will fail. You should modify the renewal script to stop the server before renewal and starting it again after.









