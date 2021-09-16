/*
PROBLEM
- Write a function that takes two element `id` as arguments and swaps the positions of the elements represented by the id

Input: two numbers
Output: true for valid swaps and undefined for invalid swaps

ALGORITHM
- Given two `id` values 
- Find the node associated with the first `id` value
- Find the node associated with the second `id` value

- Return undefined if either of those nodes do not exist

- Make a copy of the first node with id "#-copy" and insert it after the original
- Make a copy of the second node with id "#-copy" and insert it after the original

- Insert the original first node right before the copy of the second node
- Insert the original second node right before the copy of the first node

- Remove both copies of the nodes

*/

function nodeSwap(firstId, secondId) {
  let firstNode = document.getElementById(firstId);
  let secondNode = document.getElementById(secondId);

  if ((!firstNode || !secondNode) || (firstNode.parentNode !== secondNode.parentNode)) {
      return undefined;
  }

  let firstNodeCopy = firstNode.cloneNode();
  let secondNodeCopy = firstNode.cloneNode();
  firstNodeCopy.id = 'first_copy';
  secondNodeCopy.id = 'second_copy';
  
  firstNode.insertAdjacentElement('beforebegin', firstNodeCopy);
  secondNode.insertAdjacentElement('beforebegin', secondNodeCopy);

  secondNodeCopy.insertAdjacentElement('beforebegin', firstNode);
  firstNodeCopy.insertAdjacentElement('beforebegin', secondNode);

  firstNodeCopy.remove();
  secondNodeCopy.remove();

  return true;
}