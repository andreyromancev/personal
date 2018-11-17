IMAGE_NAME = personal_front
CONTAINER_NAME = personal_front
SCRIPT_FOLDER = `pwd`


.PHONY: build
bundle: build node-build
start: build dev-server

build:
	docker build -t $(IMAGE_NAME) .

dev-server:
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-e PORT=8090 \
		-p 8090:8090 -v $(SCRIPT_FOLDER)/src/:/var/app/src/ \
		-it --init \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		node build/dev-server.js

node-build:
	rm -r $(SCRIPT_FOLDER)/.bundle || true
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-v $(SCRIPT_FOLDER)/.bundle/:/var/app/.bundle/ \
		-it --init \
		--env-file .env \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		node build/build.js
