SCRIPT_FOLDER = `pwd`


.PHONY: bundle build start
cert-renew: stop certbot-renew start

bundle:
	rm -r $(SCRIPT_FOLDER)/.bundle || true
	mkdir $(SCRIPT_FOLDER)/.bundle
	make -C $(SCRIPT_FOLDER)/front bundle
	cp -r $(SCRIPT_FOLDER)/front/.bundle $(SCRIPT_FOLDER)/.bundle/front

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

certbot-create:
	docker run -it --rm -p 443:443 --name certbot \
	  -v /etc/letsencrypt:/etc/letsencrypt          \
	  -v /var/log/letsencrypt:/var/log/letsencrypt  \
	  certbot/certbot certonly --standalone

certbot-renew:
	docker run -it --rm -p 443:443 --name certbot \
	  -v /etc/letsencrypt:/etc/letsencrypt          \
	  -v /var/log/letsencrypt:/var/log/letsencrypt  \
	  certbot/certbot renew
