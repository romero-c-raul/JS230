// Autocomplete is now a re-usable class
import debounce from './debounce.js';

const Autocomplete = {
  wrapInput: function() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI: function() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents: function() {
    this.input.addEventListener('input', this.valueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('mousedown', this.handleClick.bind(this));
  },

  handleClick: function(event) {
    let target = event.target;
    this.reset();
    this.input.value = target.textContent;
  },

  handleKeydown: function(event) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.matches.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'Tab':
        if (this.bestMatchIndex !== null && this.matches.length !== 0) {
          this.input.value = this.matches[this.bestMatchIndex].name;
          event.preventDefault();
        }
        this.reset();
        break;
      case 'Enter':
        this.reset();
        break;
      case 'Escape':
        this.input.value = this.previousValue;
        this.reset();
        break;
    }
  },

  valueChanged: function() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, matches => {
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;

        this.draw();
      });
    } else {
      this.reset();
    }
  },

  fetchMatches: function(query, callback) {
    let request = new XMLHttpRequest();
    
    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  },

  draw: function() {
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    }

    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add('selected');
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  },

  generateOverlayContent: function(value, match) {
    let end = match.name.substr(value.length);
    return value + end;
  },

  reset: function() {
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previousValue = null;

    this.draw();
  },

  init: function(url, input) {
    this.input = input;
    this.url = url;

    this.listUI = null;
    this.overlay = null;
    
    this.visible = false;
    this.matches = [];
    
    this.wrapInput();
    this.createUI();
    
    this.valueChanged = debounce(this.valueChanged.bind(this), 300);
    
    this.bindEvents();
    this.reset();

    return this;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  let input = document.querySelector('input');
  let url = '/countries?matching=';

  let countriesAutocomplete = Object.create(Autocomplete);
  countriesAutocomplete.init(url, input);
});

// /*
// PROBLEM
//   - Convert `init`  into a `constructor` method in a class named `Autocomplete` that receives a URL and text input as arguments

// RULES
//   - Explicit Rules
//     - Method `init` will take two arguments: `url` and a `input`
//   - Implicit Rules
//     - Since we will be using the OLOO constructor pattern, our `init` method must return the object itself


// MENTAL MODEL
//   - Currently, we have an object `Autocomplete` that has several methods on it. The state is also set on the `Autocomplete` object itself, which means we cannot reuse this code.
//   - To reuse this code, we need to first choose what kind of object constructor pattern we can use. First idea is to use the OLOO constructor pattern since instructors are telling us to convert `init` into a constructor method

// ALGORITHM
//   - Add two parameters to the `init` function: url and textInput
//   - Return `this` at the end of the `init` function

//   - Within the `DOMContentLoaded` event listener:
//     - Obtain the `input element
//     - Store the desired URL in a variable

//    - Create an object with `Autocomplete` as a prototype and call `init` on it;
// */