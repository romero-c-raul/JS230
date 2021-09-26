document.addEventListener('DOMContentLoaded', () => {
  function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  let answer = getRandomNumber();
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let link = document.querySelector('a');
  let paragraph = document.querySelector('p');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;

    if (guess === answer) {
      message = 'You guessed it!';
    } else if (guess > answer) {
      message = `My number is lower than ${guess}`;
    } else if (guess < answer) {
      message = `My number is higher than ${guess}`;
    }
    
    
    paragraph.textContent = message;
  });

  link.addEventListener('click', event => {
    event.preventDefault();

    answer = getRandomNumber();
    paragraph.textContent = 'Guess a number from 1 to 100!';

    console.log('something');
  });
});

