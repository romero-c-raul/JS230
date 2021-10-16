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
    this.correct_spaces = 0;
    this.word = randomWord();

    if (!this.word) {
      this.displayMessage("Sorry, I've run out of words!");
      this.hideReplayLink();
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
    matchingGuess: function() {
      let lastGuess = this.letters_guessed.slice(-1)[0];
      return this.word.includes(lastGuess);
    },
    fillBlanks: function(char) {
      let allSpans = letters.querySelectorAll('span');
      let spanArr = [].slice.call(allSpans);

      this.word.forEach((currentLetter, index) => {
        if (char === currentLetter) {
          this.correct_spaces += 1;
          spanArr[index].textContent = char;
        }
      });
    },

    registerWrongGuess: function(char) {
      this.incorrect += 1;
      this.addGuessedLetter(char);
      
      let applesClass = `guess_${this.incorrect}`;
      apples.className = applesClass;

      if (this.incorrect >= this.totalAllowedWrongGuesses) {
        guessingGame.gameOver();
        return;
      }
    },

    registerCorrectGuess: function(char) {
      this.fillBlanks(char);
      
      if (this.correct_spaces >= this.word.length) {
        this.wonGame();
      }
            
      this.addGuessedLetter(char);
    },

    wonGame: function() {
      document.body.className = "win";
      this.displayMessage("You won the game!");
      this.showReplayLink();
    },

    addGuessedLetter: function(char) {
      let newSpan = document.createElement('span');
      newSpan.textContent = char;
      guesses.appendChild(newSpan);
    },
    gameOver: function() {
      document.body.className = "lose";
      this.displayMessage("Sorry! You are out of guesses.");
      this.showReplayLink();
    },
    showReplayLink: function() {
      replace.style.display = "inline";
    },
    hideReplayLink: function() {
      replace.style.display = "none";
    },
    resetLettersGuessed: function() {
      let allSpans = guesses.querySelectorAll('span');
      
      [].forEach.call(allSpans, currentSpan => {
        currentSpan.remove();
      });
    },
    hideMessage: function() {
      message.textContent = "";
    },
    init: function() {
      this.createBlanks();
      console.log(this.word);
    },
  }
  
  let guessingGame = new Game();

  document.addEventListener('keypress', event => {
    let char = event.key;
    let charCode = char.charCodeAt();
    
    if (guessingGame.letters_guessed.includes(char)) {
      return;
    }

    if (charCode < 97 || charCode > 122) {
      return;
    }

    guessingGame.letters_guessed.push(char);
    
    if (guessingGame.matchingGuess()) {
      guessingGame.registerCorrectGuess(char);
    } else {
      guessingGame.registerWrongGuess(char);
    }

    console.log(guessingGame.correct_spaces);
  });

  replace.addEventListener('click', event => {
    guessingGame.hideMessage();
    guessingGame.hideReplayLink();
    event.preventDefault();
    
    guessingGame = new Game();
    guessingGame.resetLettersGuessed();
    document.body.className = "";
  });
});