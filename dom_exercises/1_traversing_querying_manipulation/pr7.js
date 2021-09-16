/*
PROBLEM
  - Implement a function that converts the DOM, starting from the `body`, to nested arrays
  - Each element in the DOM is represented as ["PARENT TAG", [children]]
  - When an element has no children, it is represented by an empty array

ALGORITHM
- Identify parent node
- Identify children
*/

function nodesToArr(...nodes) {
  return nodes.map(currentNode => {
      console.log(currentNode);
     let children = [].slice.call(currentNode.children);
     return [currentNode.nodeName, nodesToArr(...children)]; 
  });
}

nodesToArr(document.body);