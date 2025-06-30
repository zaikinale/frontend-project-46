// src/formatters/plain.js

function formatPlain(tree) {
  const result = [];

  const walk = (nodes, path = '') => {
    nodes.forEach((node) => {
      const currentPath = path ? `${path}.${node.key}` : node.key;

      switch (node.type) {
        case 'nested':
          walk(node.children, currentPath);
          break;
        case 'added':
          result.push(`Property '${currentPath}' was added with value: ${stringifyValue(node.value)}`);
          break;
        case 'removed':
          result.push(`Property '${currentPath}' was removed`);
          break;
        case 'modified':
          result.push(
            `Property '${currentPath}' was updated. From ${stringifyValue(node.value1)} to ${stringifyValue(node.value2)}`,
          );
          break;
        case 'unchanged':
          // Пропускаем неизменённые узлы
          break;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  };

  const stringifyValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }

    if (typeof value === 'string') {
      return `'${value}'`;
    }

    return String(value);
  };

  walk(tree);

  return result.join('\n');
}

export default formatPlain;
