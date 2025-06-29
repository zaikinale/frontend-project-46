// src/diff.js

export default function buildDiffTree(data1, data2) {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort((a, b) => a.localeCompare(b));

  return keys.map((key) => {
    const isObject1 = typeof data1[key] === 'object' && !Array.isArray(data1[key]) && data1[key] !== null;
    const isObject2 = typeof data2[key] === 'object' && !Array.isArray(data2[key]) && data2[key] !== null;

    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (isObject1 && isObject2) {
      return { key, type: 'nested', children: buildDiffTree(data1[key], data2[key]) };
    }

    if (data1[key] !== data2[key]) {
      return { key, type: 'modified', value1: data1[key], value2: data2[key] };
    }

    return { key, type: 'unchanged', value: data1[key] };
  });
}
