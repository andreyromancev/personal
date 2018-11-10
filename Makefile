SCRIPT_FOLDER = `pwd`


.PHONY: bundle build start

bundle:
	rm -r $(SCRIPT_FOLDER)/.bundle || true
	mkdir $(SCRIPT_FOLDER)/.bundle
	make -C $(SCRIPT_FOLDER)/front bundle
	cp -r $(SCRIPT_FOLDER)/front/.bundle $(SCRIPT_FOLDER)/.bundle/front

build:
	docker-compose build

start:
	docker-compose up -d
