// src/index.js

import parseFile from './parsers.js';
import buildDiffTree from './diff.js';
import formatStylish from './formatters/stylish.js';

export default function genDiff(filepath1, filepath2, options = {}) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = buildDiffTree(data1, data2);

  switch (options.format) {
    case 'stylish':
    case undefined:
      return formatStylish(diffTree);
    case 'json':
      return JSON.stringify(diffTree, null, 2);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
}
