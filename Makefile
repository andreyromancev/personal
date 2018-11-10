SCRIPT_FOLDER = `pwd`


.PHONY: bundle build start

bundle:
	mkdir .bundle || true
	make -C front bundle
	cp -r front/.bundle .bundle/front

build:
	docker-compose build

start:
	docker-compose up -d
