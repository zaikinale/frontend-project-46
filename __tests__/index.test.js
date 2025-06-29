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

  test('deep JSON files', () => {
    const expected_nested = readFileSync(getFixturePath('expected_nested.txt'), 'utf-8').trim();
    const actual = genDiff(getFixturePath('file1_nested.json'), getFixturePath('file2_nested.json')).trim();

    console.log('EXPECTED:\n', expected_nested);
    console.log('ACTUAL:\n', actual);

    expect(actual).toEqual(expected_nested);
  });

  test('deep YAML files', () => {
    const expected_nested = readFileSync(getFixturePath('expected_nested.txt'), 'utf-8').trim();
    const actual = genDiff(getFixturePath('file1_nested.yaml'), getFixturePath('file2_nested.yaml')).trim();
    expect(actual).toEqual(expected_nested);
  });

  test('unsupported file format', () => {
    expect(() => {
      genDiff(getFixturePath('before.txt'), getFixturePath('after.yaml'));
    }).toThrow(/Unsupported file extension/);
  });
})
