IMAGE_NAME = personal_blog
CONTAINER_NAME = personal_blog
SCRIPT_FOLDER = `pwd`


.PHONY: build
start: dev-server
bundle: build hugo-build

build:
	docker build -t $(IMAGE_NAME) .

dev-server:
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-it \
		-v $(SCRIPT_FOLDER)/:/var/app/ \
		-p 8080:8080 \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		hugo server -D --bind 0.0.0.0 -p 8080

hugo-build:
	rm -r $(SCRIPT_FOLDER)/.bundle || true
	docker rm -f $(CONTAINER_NAME) || true
	docker run \
		-v $(SCRIPT_FOLDER)/.bundle/:/var/app/.bundle/ \
		-e HUGO_ENV=production \
		-it \
		--name $(CONTAINER_NAME) $(IMAGE_NAME) \
		hugo -d .bundle
