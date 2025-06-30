// src/parsers.js

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parseFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const ext = path.extname(fullPath).toLowerCase();

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf-8');

  switch (ext) {
    case '.json':
      return JSON.parse(content);

    case '.yaml':
    case '.yml': {
      try {
        const parsed = yaml.load(content);

        // Рекурсивно заменяем все null на ''
        const replaceNulls = (obj) => {
          if (typeof obj !== 'object' || obj === null) return obj;

          Object.entries(obj).forEach(([key, value]) => {
            if (value === null) {
              obj[key] = "";
            }
            else if (typeof value === 'object') {
              Object.keys(value).forEach(() => replaceNulls(value));
            }
          });

          return obj;
        };

        const result = replaceNulls(parsed);
        return result;
      }
      catch (err) {
        throw new Error(`Failed to parse YAML file: ${err.message}`);
      }
    }

    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
}
