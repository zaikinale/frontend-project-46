#!/usr/bin/env node

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');
import { program } from 'commander';

// const format = (types) => {
//     const incomingType = [...types]
// };

program
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'display help for command');

program.parse(process.argv);
