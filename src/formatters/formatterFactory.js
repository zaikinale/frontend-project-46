// src/formatters/formatterFactory.js

import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

export default function chooseFormatter(tree, formatName) {
  const formatter = formatters[formatName];

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`);
  }

  return formatter(tree);
}
