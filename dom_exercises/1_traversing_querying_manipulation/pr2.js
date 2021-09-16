function walk(node, callback) {
  callback(node);                       // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index], callback);   // recursively call walk()
  }
}

function directAndIndirectChildNodes(node) {
  let directChildNodes = node.childNodes.length;
  let allNodesCount = 0;

  walk(node, currentNode => {
    allNodesCount += 1;
  });

  return [directChildNodes, allNodesCount - directChildNodes - 1];
}
