SCRIPT_FOLDER = `pwd`


.PHONY: build restart

build:
	mkdir .build || true
	make -C front bundle
	cp -r front/.bundle .build/front

restart:
	docker-compose down
	docker-compose up
