// 1. Reverse the behavior of scenario 3. Have the alert box of the div#elem1 element show up first.

let elem1 = document.querySelector('#elem1');
let elem4 = document.querySelector('#elem4');

elem1.addEventListener('click', event => alert(event.currentTarget.id), true); // Used the third argument to call callback on capturing phase
elem4.addEventListener('click', event => alert(event.currentTarget.id));


// 2.

let divs = document.querySelectorAll('.pick');

for(let index = 0; index < divs.length; index += 1) {
  divs[index].addEventListener('click', highlightThis, true);
}
    
function highlightThis(e) {
  alert(`${this.className} ${e.currentTarget.tagName}`);
}

/*
- Create a collection with all elements with class `div`
  - This is only elements 1, 2, 4
- Iterate through div collection
  - For each div, add an event listener for a `click` event
    - This event listener will call `highlightThis` function during the capturing phase
      - `highlightThis` alerts the classname of the currentTarget
      - It also alerts the currentTarget tagname 
- Basically, whenever we click 1, 2, 3, or 4 we will get alerts in the following order: 
  - `d1 pick DIV`
    - If we click on 1
  - `d2 pick MAIN`
    - If we click on 2 or 3
  - `d4 pick SECTION`
    - If we click 1, 2, 3, or 4

- If we add the code: 
  `document.querySelector('.d3').addEventListener('click', highlightThis, false);`

  - The change is that clicking 3 and 4 will add an additional alert that says `d3 DIV` during the bubbling phase
*/


// 3.

/*
- Only 1 and 4 will fire off an alert since they have an outer-inner element relationship
*/