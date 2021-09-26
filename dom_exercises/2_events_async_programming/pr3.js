/* 
- Write a function makeBold that takes an element was well as an optional callback
- The function will always make the element bold
- Plus whatever you passed as a callback
*/

// function makeBold(element, callback) {
//   element.style.fontWeight = 'bold';
  
//   if (callback && typeof callback === 'function') {
//     callback(element);
//   }
// }

// let sectionElement = document.querySelector('section');

// makeBold(sectionElement, function(elem) {
//   elem.classList.add('highlight');
// });

// console.log(sectionElement.classList.contains('highlight'));
// console.log(sectionElement.style.fontWeight);

// Further Exploration

const sectionElement = document.querySelector('section');

function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

sectionElement.addEventListener('bolded', (event) => {
  alert(event.target.tagName);
  event.target.classList.add('highlight');
});

makeBold(sectionElement);