// 1. 
let allh2Headings = document.querySelectorAll('h2');

allh2Headings = [].slice.call(allh2Headings);

let h2Count = allh2Headings.map(currentHeading => {
  return currentHeading.textContent.split(' ').length;
});

console.log(h2Count);


// 2.

 document.querySelector('#toc');
 document.querySelectorAll('#toc')[0];
 document.getElementById('toc');
 document.getElementsByClassName('toc')[0];


// 3.
 let allLinkNodes = document.querySelectorAll('.toc ul li');
 let linkNodesArray = [].slice.call(allLinkNodes);

linkNodesArray.forEach((currentNode, index) => {
  if (index % 2 !== 0) {
    currentNode.querySelector('a').style.color = 'green';
  }
});


// 4. 

let allCaptionNodes = document.querySelectorAll('.thumbcaption');
let captionNodesArr = [].slice.call(allCaptionNodes);

let allCaptions = captionNodesArr.map(captionNode => {
  return captionNode.textContent.trim();
});

console.log(allCaptions);


// 5. 

let keys = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];

let allTd = document.querySelectorAll('.infobox td');
let tdArray = [].slice.call(allTd);

// console.log(tdArray);

let classification = {};

tdArray.forEach(currentNode => {
  if (keys.includes(currentNode.textContent.slice(0, -1))) {
    let currentKey = currentNode.textContent.slice(0, -1);
    let currentValue = currentNode.nextElementSibling.textContent;

    classification[currentKey] = currentValue;
  } 
});

console.log(classification);