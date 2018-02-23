all: build

build:
	yarn
	$(MAKE) documentation

clean:
	yarn add rimraf --dev
	yarn run clean

test:
	yarn test

documentation:
	yarn
	$(MAKE) clean-documentation
	$(MAKE) docs/generated
	$(MAKE) examples.js

clean-documentation:
	rm -rf ./docs/generated
	rm -rf ./examples.js

docs/generated:
	mkdir -p ./docs/generated
	cd examples.md && npx docco ./*.md --output ../docs/generated

examples.js:
	mkdir -p ./examples.js
	$(MAKE) $(patsubst ./examples.md/%.md,./examples.js/%, $(wildcard ./examples.md/*.md))

examples.js/%: examples.md/%.md
	npx voc $< > $@
	chmod u+x $@

.PHONY: all clean clean-documentation documentation build test
