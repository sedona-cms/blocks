lint:
	npx eslint --fix '{src,scripts}/**/*.{js,ts,tsx}'

build-ts-dev: lint
	rm -rf lib
	npx tsc --project tsconfig.json

build-ts-prod: lint
	rm -rf lib
	npx tsc --project tsconfig.build.json

copy-css:
	cd ./src && find . -name '*.css' | cpio -pdm ./../lib

copy-js-templates:
	cp -f src/templates/blocks-plugin.js lib/templates/blocks-plugin.js

build-dev: build-ts-dev copy-js-templates

build-prod: build-ts-prod copy-css copy-js-templates

watch: build-dev
	npx tsc-watch --onSuccess 'make -f Makefile copy-css'
