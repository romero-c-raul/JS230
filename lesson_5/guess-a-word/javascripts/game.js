/*
PROBLEM
  - We'll need a function `randomWord` that can pick one word out at a time randomly.

RULES
  - A picked word can't be picked again, and when all words are taken, return undefined
  - Our function has to have access to the words array defined outside of it. With each call of the function, it mutates the array to remove the element it used.

ALGORITHM
  - Generate a random value between 1 and the max number of elements in the array
  - Delete the element with the index that shares that random value and return it
*/

// let randomWord = (() => {
//   let wordsArray = ['apple', 'banana', 'orange', 'pear'];
  
//   function getRandomIndex() {
//     let max = wordsArray.length - 1;
//     return Math.floor(Math.random() * (max + 1));
//   }
  
//   return () => {
//     let chosenIndex = getRandomIndex();
//     return wordsArray.splice(chosenIndex, 1)[0];
//   }
// })();

let Game = (() => {
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

  function removeCurrentBlanks() {
    let spaces = document.querySelector('#spaces');
    let allSpans = spaces.querySelectorAll('span');

    if (allSpans.length >= 1) {
      [].forEach.call(allSpans, currentSpan => {
        currentSpan.remove();
      });
    }
  }

  function setBlanksForWordContainer(wordToGuess) {
    removeCurrentBlanks();
    
    let spaces = document.querySelector('#spaces');

    for(let index = 0; index < wordToGuess.length; index += 1) {
      let newSpan = document.createElement('span');
      spaces.appendChild(newSpan);
    }

    console.log(wordToGuess);
  }

  function noMoreWords() {
    let message = document.querySelector('#message');
    message.textContent = "Sorry, I've run out of words!";
  }

  return function Game() {
    this.wordToGuess = randomWord();

    if (!this.wordToGuess) {
      noMoreWords();
    } else {
      this.incorrectGuesses = 0;
      this.lettersGuessed = [];
      this.totalAllowedWrongGuesses = 6;
  
      setBlanksForWordContainer(this.wordToGuess);
    }
  };
})();

new Game();