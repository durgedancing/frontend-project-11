install: 
	npm ci

publish:
	npm publish --dry--run

lint:
	npx eslint .

test:
	npm test

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack