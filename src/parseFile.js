// src/parseFile.js
import fs from 'fs';
import path from 'path';

export default function parseFile(filePath) {
    const fullPath = path.resolve(process.cwd(), filePath);
    const ext = path.extname(fullPath).toLowerCase();

    const content = fs.readFileSync(fullPath, 'utf8');

    switch (ext) {
        case '.json':
            return JSON.parse(content);
        // case '.yml':
        //     return yaml.parse(content);
        default:
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}