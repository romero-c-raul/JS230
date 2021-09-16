/*
PROBLEM
  - Implement a function `sliceTree` that takes two arguments: 
    - Start index (parent node id)
    - End index (innermost child node id)
  - Function returns an array of tagNames

RULES
  - This function is inclusive on the right hand side
  - End index is not necesarilly the innermost child node
  - Only consider element nodes
  - Only elements that have `body` as an ancestor are sliceable
  - If either start or end id are not in the dom, return undefined
  - If theres no path connecting the starting index to the ending index, return undefined

ALGORITHM
  - Identify the innermost child node
  - Travel through the parent nodes of said child node:
    - For each node, push the `tagNames` into an array
  - If you reach the parent node with the start index
    - return the collection
  - if you reach the body node, return undefined

*/

function sliceTree(start, end) {
  let endNode = document.getElementById(end);
  let allNodes = [];
  let currentNode = endNode;

  if (currentNode === null) {
      return undefined;
  }

  while (currentNode !== document.body) {
      allNodes.unshift(currentNode.nodeName);

      if (currentNode.id === start.toString()) {
          break;
      }

      currentNode = currentNode.parentElement;
  }
  
//     console.log(currentNode, allNodes);
  return currentNode === document.body ? undefined : allNodes;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));