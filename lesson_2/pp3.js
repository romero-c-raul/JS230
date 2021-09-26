// 1. Starting with the template below, write some JavaScript code to move the red X to the last position in the document that the user clicked. Click the "EDIT ON CODEPEN" button on the upper-right to edit the template.

document.addEventListener('click', event => {
  let x = document.querySelector('.x'); 
  let hPosition = event.clientX;
  let vPosition = event.clientY;

  x.style.top = String(vPosition) + 'px';
  x.style.left = String(hPosition) + 'px';
});

// First I obtained the element with class `x`. This class has two properties we want to modify: top and left
// We then use the event property `clientX` and `clientY` to obtain our mouse position when we click.
// We convert this mouse position to string, append `px` and modify the top and left properties


// 2. Update your solution to the previous problem to make the red X move as you move the mouse around the document instead of depending on clicks.

document.addEventListener('mousemove', event => {
  let x = document.querySelector('.x'); 
  let hPosition = event.clientX;
  let vPosition = event.clientY;

  x.style.top = String(vPosition) + 'px';
  x.style.left = String(hPosition) + 'px';
});


// 3. Update your solution to the previous problem to change the color of the red X to blue when the user presses the b key, green in response to the g key, and red in response to r. The X should continue to follow the mouse around.



// 4. 

document.addEventListener('DOMContentLoaded', () => {
  let maxCharCount = 140;
  let textbox = document.querySelector('textarea');
  let counter = document.querySelector('.counter');
  let composer = document.querySelector('.composer');
  let button = document.querySelector('button');
  
  function updateCounter() {
    let length = textbox.value.length;
    let remaining = maxCharCount - length;
    let message = `${maxCharCount - length} characters remaining.`

    counter.textContent = message;

    if (remaining < 0) {
      textbox.className = 'invalid';
      button.disabled = true;
    } else {
      textbox.className = '';
      button.disabled = false;
    }
  }

  textbox.addEventListener('keyup', updateCounter);

  updateCounter();
});