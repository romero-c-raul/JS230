let tracker = (() => {
  let allEvents = [];

  return {
      add(event) {
          allEvents.push(event);
      },

      elements() {
          return allEvents.map(currentEvent => {
            return currentEvent.target;
          });
      },

      clear() {
          allEvents = [];
          return allEvents.length;
      },

      list() {
        return allEvents.slice();
      },
  }
})();

/*
PROBLEM
- Implement a function that tracks events on a web page by:
  - Wrapping a callback function in a function that adds each event to a tracker object before invoking the callback

- Your function should take a callback function as an argument and return a function that:
  - Records the event
  - executes the original callback function

MENTAL MODEL
- Create a tracker object with `list`, `elements`, and `clear` methods
- Within out `track` function:
- Return a function
  - This function is the `listener`, meaning that this function will have access to the event object
  - Push the event to the tracker if its not already there
  - Invoke the callback and pass the event object as an argument
*/

function track(callback) {
  return event => {
    if (!tracker.list().includes(event)) {
        tracker.add(event);
    }
    
    callback(event);
  };
}

let divRed = document.querySelector('#red');
let divBlue = document.querySelector('#blue');
let divOrange = document.querySelector('#orange');
let divGreen = document.querySelector('#green');


divRed.addEventListener('click', track(event => {
document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
event.stopPropagation();
document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
document.body.style.background = 'green';
}));