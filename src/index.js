// src/index.js

import parseFile from './parsers.js';
import buildDiffTree from './diff.js';
import chooseFormatter from './formatters/formatterFactory.js';

export default function genDiff(filepath1, filepath2, options = {}) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diffTree = buildDiffTree(data1, data2);
  const format = options.format || 'stylish';

  return chooseFormatter(diffTree, format);
}
