/*
PROBLEM
  - Write a function that colors a specific generation of the DOM tree. A generation is a set of elements that are on the same level of indentation

MENTAL MODEL
  - What does same level of indentation mean?
    - How far away they are from the body node
    - We could potentially check every node, and see how many "steps" away it is from the body node
*/

function walk(node, callback) {
  callback(node);                       
  for (let index = 0; index < node.children.length; index += 1) { 
    walk(node.children[index], callback);   
  }
}

function nodesFromBody(node) {
    let counter = 0;
    let currentNode = node;

    while (currentNode !== document.body) {
        counter += 1;
        currentNode = currentNode.parentElement;
    }
    
    return counter;
}

// console.log(nodesFromBody(document.getElementById(1)));
// console.log("");
// console.log(nodesFromBody(document.getElementById(2)));
// console.log(nodesFromBody(document.getElementById(5)));
// console.log("");
// console.log(nodesFromBody(document.getElementById(3)));
// console.log(nodesFromBody(document.getElementById(6)));
// console.log(nodesFromBody(document.getElementById(11)));
// console.log("");
// console.log(nodesFromBody(document.getElementById(4)));
// console.log(nodesFromBody(document.getElementById(7)));
// console.log(nodesFromBody(document.getElementById(12)));
// console.log(nodesFromBody(document.getElementById(16)));


function findNodesFromGeneration(num) {
    let allGenerationNodes = [];

    if (num < 1) {
        return allGenerationNodes;
    }

    walk(document.body,currentNode => {
        if (nodesFromBody(currentNode) === num) {
            allGenerationNodes.push(currentNode);
        }
    });

    return [].slice.call(allGenerationNodes);
}

// console.log(findNodesFromGeneration(1));
// console.log(findNodesFromGeneration(2));
// console.log(findNodesFromGeneration(3));
// console.log(findNodesFromGeneration(4));
// console.log(findNodesFromGeneration(5));
// console.log(findNodesFromGeneration(6));
// console.log(findNodesFromGeneration(7));
// console.log(findNodesFromGeneration(0));
// console.log(findNodesFromGeneration(8));

function colorNodes(allNodes) {
    if (allNodes.length < 1) {
        return;
    }

    allNodes.forEach(currentNode => {
       currentNode.classList.add('generation-color') ;
    });
}

colorNodes(findNodesFromGeneration(1));
colorNodes(findNodesFromGeneration(4));
colorNodes(findNodesFromGeneration(0));
colorNodes(findNodesFromGeneration(7));
colorNodes(findNodesFromGeneration(8));
colorNodes(findNodesFromGeneration(3));