// 1. 

// let heading = document.querySelector('h1');
// heading.classList.add('heading');

// or

let heading = document.getElementById('primary_heading');
// console.log(heading);


heading.setAttribute('class', 'heading');

// heading.classList.add('heading'); // You can do this as well


// 2.

let list = document.getElementById('list');
// console.log(list);
list.classList.add('bulleted');


// 3.

/*
- Set the links onclick property to a function that makes the element visible 
    when it is hidden, and hides it when it is visible

ALGORITHM
- Access the link node
- Set the onclick property to a function
    - This function will find the hidden/not hidden node
    - Use 'getAttribute' to access the class
        - If the 'class' attribute is set to 'hidden', change to 'visible'
        - If the 'class' attribute is set to 'visible', change to 'hidden'
*/

let link = document.getElementById('toggle');

function toggleFn(e) {
    e.preventDefault();

    let secretNode = document.getElementById('notice');
    let value = secretNode.getAttribute('class');

    if (value === 'hidden') {
        secretNode.setAttribute('class', 'visible');
    } else {
        secretNode.setAttribute('class', 'hidden');
    }

//     secretNode.setAttribute('class', value === 'hidden' ? 'visible' : 'hidden');
}

link.onclick = toggleFn;


// 4. 

let hiddenElement = document.getElementById('notice');

hiddenElement.onclick = function(e) {
    e.preventDefault();

    this.setAttribute('class', 'hidden');
}


// 5.

let multParagraph = document.getElementById('multiplication');
//multParagraph.textContent = '117';
multParagraph.textContent = String(13 * 9);


// 6. 

let body = document.body;
body.setAttribute('id', 'styled');