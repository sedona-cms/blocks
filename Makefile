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

build-dev: build-ts-dev

build-prod: build-ts-prod copy-css

watch: build-dev
	npx tsc-watch --onSuccess 'make -f Makefile copy-css'
