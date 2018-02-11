all: build
	$(MAKE) clean-documentation
	$(MAKE) documentation

build:
	yarn

clean:
	yarn add rimraf --def
	yarn run clean

test: build documentation
	yarn test

documentation: build docs/generated examples.js

clean-documentation:
	rm -rf ./docs/generated
	rm -rf ./examples.js

docs/generated:
	mkdir -p ./docs/generated
	npx docco ./examples.md/*.md --output ./docs/generated

examples.js:
	mkdir -p ./examples.js
	$(MAKE) $(patsubst ./examples.md/%.md,./examples.js/%, $(wildcard ./examples.md/*.md))

examples.js/%: examples.md/%.md
	npx voc $< > $@
	chmod u+x $@

.PHONY: all clean clean-documentation documentation build test
