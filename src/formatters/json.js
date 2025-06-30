// src/formatters/json.js

function formatJson(tree) {
  const buildNode = (node) => {
    if (node.type === 'nested') {
      return node.children.reduce((acc, child) => {
        acc[child.key] = buildNode(child);
        return acc;
      }, {});
    }

    switch (node.type) {
      case 'added':
        return {
          status: 'added',
          value: node.value,
        };
      case 'removed':
        return {
          status: 'removed',
          value: node.value,
        };
      case 'modified':
        return {
          status: 'modified',
          oldValue: node.value1,
          newValue: node.value2,
        };
      case 'unchanged':
        return {
          status: 'unchanged',
          value: node.value,
        };
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  };

  const result = tree.reduce((acc, node) => {
    acc[node.key] = buildNode(node);
    return acc;
  }, {});

  return JSON.stringify(result, null, 2);
}

export default formatJson;
