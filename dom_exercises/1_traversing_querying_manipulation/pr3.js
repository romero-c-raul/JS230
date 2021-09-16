/*
- Identify and extract the node that matches the given id
- Obtain all the sibling elements of that node
- Get all the names of all nodes and push to collection
- Get the parent element of the current node and repeat the process
- Stop when the current node is the body node
*/

function domTreeTraces(id) {
  let currentNode = document.getElementById(id);
  let allNodes = [];
  
  while (currentNode !== document.body) {
    let parentElement = currentNode.parentElement;
    let allChildren = parentElement.children;

    let allChildrenArr = [].slice.call(allChildren);
    allChildrenArr = allChildrenArr.map(currentNode => {
      return currentNode.nodeName;
    });

    allNodes.push(allChildrenArr);
    currentNode = currentNode.parentElement;
  }

  return allNodes;
}