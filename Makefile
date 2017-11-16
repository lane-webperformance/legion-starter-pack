explain:
	echo "This Makefile is for regenerating the documentation and example scripts. Most users shouldn't need to to run it."

all:
	npm install
	$(MAKE) clean
	$(MAKE) documentation

documentation: docs/generated examples.js

docs/generated:
	mkdir -p ./docs/generated
	npx docco ./examples.md/*.md --output ./docs/generated

examples.js:
	mkdir -p ./examples.js
	$(MAKE) $(patsubst ./examples.md/%.md,./examples.js/%, $(wildcard ./examples.md/*.md))

examples.js/%: examples.md/%.md
	npx voc $< > $@
	chmod u+x $@

clean:
	rm -rf ./docs/generated
	rm -rf ./examples.js

.PHONY: all documentation clean
