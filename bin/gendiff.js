#!/usr/bin/env node

import { createRequire } from 'node:module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

import { program } from 'commander';
import genDiff from '../src/index.js';

function getFullPath(filepath) {
  const filename = path.basename(filepath);
  const fixturePath = path.resolve(process.cwd(), '__fixtures__', filename);

  if (path.isAbsolute(filepath)) {
    return filepath;
  }

  if (fs.existsSync(fixturePath)) {
    return fixturePath;
  }

  throw new Error(`File not found: ${filename}`);
}

program
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'display help for command')
  .action((filepath1, filepath2, options) => {
    const fullPath1 = getFullPath(filepath1);
    const fullPath2 = getFullPath(filepath2);

    const diff = genDiff(fullPath1, fullPath2, options);
    console.log(diff);
  });

program.parse(process.argv);
