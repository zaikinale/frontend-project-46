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
        const result = yaml.load(content);
        // Приводим null к строке 'null' для диффа
        return JSON.parse(JSON.stringify(result, (k, v) => v === null ? 'null' : v));
      }
      catch (err) {
        throw new Error(`Failed to parse YAML file: ${err.message}`);
      }
    }
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
}
