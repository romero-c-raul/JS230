document.addEventListener('DOMContentLoaded', () => {
  const message = document.querySelector('#message');
  const letters = document.querySelector('#spaces');
  const guesses = document.querySelector('#guesses');
  const apples = document.querySelector('#apples');
  const replace = document.querySelector('#replay');

  let randomWord = (() => {
    let wordsArray = ['apple', 'banana', 'orange', 'pear'];
    
    function getRandomIndex() {
      let max = wordsArray.length - 1;
      return Math.floor(Math.random() * (max + 1));
    }
    
    return () => {
      let chosenIndex = getRandomIndex();
      return wordsArray.splice(chosenIndex, 1)[0];
    }
  })();

  function Game() {
    this.incorrect = 0;
    this.letters_guessed = [];
    this.totalAllowedWrongGuesses = 6;
    this.correct_spaces = 0; // What is this for?
    this.word = randomWord();

    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      return this;
    }
    
    this.word = this.word.split('');
    this.init();
  }

  Game.prototype = {
    createBlanks: function() {
      this.removeBlanks();
  
      for(let index = 0; index < this.word.length; index += 1) {
        let newSpan = document.createElement('span');
        letters.appendChild(newSpan);
      }
    },
    removeBlanks: function() {
      let allSpans = letters.querySelectorAll('span');
  
      if (allSpans.length >= 1) {
        [].forEach.call(allSpans, currentSpan => {
          currentSpan.remove();
        });
      }
    },
    displayMessage: function(text) {
      message.textContent = text;
    },
    init: function() {
      this.createBlanks();
    }
  }
  
  new Game();
});