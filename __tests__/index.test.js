// __tests__/index.test.js

import { readFileSync } from 'fs'
import path from 'path'
import url from 'url'
import genDiff from '../src/index.js'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('flat JSON files', () => {
    const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8').trim()
    const actual = genDiff(getFixturePath('before.json'), getFixturePath('after.json')).trim()
    expect(actual).toEqual(expected)
  })

  test('flat YAML files', () => {
    const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8');
    const actual = genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'));
    expect(actual).toEqual(expected);
  })

  test('unsupported file format', () => {
    expect(() => {
      genDiff(getFixturePath('before.txt'), getFixturePath('after.yaml'));
    }).toThrow(/Unsupported file extension/);
  });
})
