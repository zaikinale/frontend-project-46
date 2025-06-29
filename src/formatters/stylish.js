export default function formatStylish(tree) {
  const indentSize = 4;

  const getIndent = (depth) => ' '.repeat(depth * indentSize - 2);
  const getBracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize);

  const formatValue = (value, depth, isRemoved = false) => {
    if (typeof value !== 'object' || value === null) {
      if (value === null && isRemoved) {
        return '';
      }
      return value === null ? 'null' : String(value);
    }

    const entries = Object.entries(value);
    const lines = entries.map(
      ([key, val]) => `${getIndent(depth + 1)}  ${key}: ${formatValue(val, depth + 1, isRemoved)}`,
    );

    return `{\n${lines.join('\n')}\n${getBracketIndent(depth + 1)}}`;
  };

  const render = (node, depth) => {
    switch (node.type) {
      case 'nested':
        return `${getIndent(depth)}  ${node.key}: {\n${node.children
          .map((child) => render(child, depth + 1))
          .join('\n')}\n${getBracketIndent(depth + 1)}}`;
      case 'added': {
        const valueStr = formatValue(node.value, depth);
        return `${getIndent(depth)}+ ${node.key}: ${valueStr}`;
      }
      case 'removed': {
        const valueStr = formatValue(node.value, depth, true);
        return `${getIndent(depth)}- ${node.key}: ${valueStr}`;
      }
      case 'modified': {
        const oldVal = formatValue(node.value1, depth, true);
        const newVal = formatValue(node.value2, depth);
        return [
          `${getIndent(depth)}- ${node.key}: ${oldVal}`,
          `${getIndent(depth)}+ ${node.key}: ${newVal}`,
        ].join('\n');
      }
      case 'unchanged':
        return `${getIndent(depth)}  ${node.key}: ${formatValue(node.value, depth)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };

  return `{\n${tree.map((node) => render(node, 1)).join('\n')}\n}`;
}
