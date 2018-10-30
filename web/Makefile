IMAGE_NAME = personal_web
CONTAINER_NAME = personal_web
SCRIPT_FOLDER = `pwd`


.PHONY: build
start: build dev-server

build:
	docker build -t $(IMAGE_NAME) .

dev-server:
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-p 8090:8090 -v $(SCRIPT_FOLDER)/src/:/var/app/src/ \
		-it --init \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		node build/dev-server.js

bundle:
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-v $(SCRIPT_FOLDER)/.bundle/:/var/app/.bundle/ \
		-it --init \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		node build/build.js
