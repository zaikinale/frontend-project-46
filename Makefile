# Makefile

lint:
	npm run lint

lint-fix:
	npm run lint -- --fix

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js

coverage:
	node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage