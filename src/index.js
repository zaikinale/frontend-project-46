// src/index.js
import parseFile from './parseFile.js';

export default function action(filepath1, filepath2) {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    console.log('Data 1:', data1);
    console.log('Data 2:', data2);

}

export { action };