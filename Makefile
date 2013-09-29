
test: modules build
	grunt test

modules: package.json
	@npm install --dev

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js node_modules

.PHONY: clean
