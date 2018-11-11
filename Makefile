SCRIPT_FOLDER = `pwd`


.PHONY: bundle build stop start
cert-renew: stop certbot-renew start
bundle: bundle-front bundle-blog

bundle-front:
	mkdir $(SCRIPT_FOLDER)/.bundle || true
	make -C $(SCRIPT_FOLDER)/front bundle
	rm -r $(SCRIPT_FOLDER)/.bundle/front || true
	mv $(SCRIPT_FOLDER)/front/.bundle $(SCRIPT_FOLDER)/.bundle/front

bundle-blog:
	mkdir $(SCRIPT_FOLDER)/.bundle || true
	make -C $(SCRIPT_FOLDER)/blog bundle
	rm -r $(SCRIPT_FOLDER)/.bundle/blog || true
	mv $(SCRIPT_FOLDER)/blog/.bundle $(SCRIPT_FOLDER)/.bundle/blog

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
