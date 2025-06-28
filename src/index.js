// src/index.js
import parseFile from './parseFile.js'

export default function action(filepath1, filepath2) {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const allKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])]
  const sortedKeys = allKeys.sort()

  const lines = sortedKeys.map((key) => {
    const inFirst = Object.hasOwn(data1, key)
    const inSecond = Object.hasOwn(data2, key)
    const val1 = data1[key]
    const val2 = data2[key]

    if (inFirst && !inSecond) {
      return `  - ${key}: ${val1}`
    }
    if (!inFirst && inSecond) {
      return `  + ${key}: ${val2}`
    }
    if (val1 !== val2) {
      return [`  - ${key}: ${val1}`, `  + ${key}: ${val2}`]
    }
    return `    ${key}: ${val1}`
  })
  const result = '{\n' + lines.flat().join('\n') + '\n}'

  return result;
}

export { action }
