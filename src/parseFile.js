// src/parseFile.js

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function parseFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const ext = path.extname(fullPath).toLowerCase();

  if (ext !== '.json' && ext !== '.yaml' && ext !== '.yml') {
    throw new Error(`Unsupported file extension: ${ext}`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File does not exist: ${fullPath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  switch (ext) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      try {
        return yaml.load(content);
      }
      catch (err) {
        throw new Error(`Failed to parse YAML file: ${err.message}`);
      }
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
}
