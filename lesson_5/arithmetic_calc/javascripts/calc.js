/*
PROBLEM
  - Build a simple arithmetic calculator

RULES
  - Calculator should take two numbers as input
  - It should show a selection list that controls which arithmetic operation the calculator performs
  - Should also have a button that performs the calculation
  - Display the result above the inputs

MENTAL MODEL
  - You will enter a number on each of the input boxes
  - You will select an operator from the drop down list
  - Click the "equals" button
  - Result will be displayed at the top

ALGORITHM (Event handle for clicking on equals)
  - We need an event handler that is listening for a click event on the equals button
  - After clicking on this button, we need to obtain the values in both of the text boxes and we need to also obtained the arithmetic operator selected
  - We will use these two numbers and operator to perform a calculation
  - The `h1` element will be updated to show the result of the calculation that was performed
*/  

function performCalc(firstNum, secondNum, operator) {
  let result;

  firstNum = Number(firstNum);
  secondNum = Number(secondNum);

  switch (operator) {
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    case "*":
      result = firstNum * secondNum;
      break;
    case "/":
      result = firstNum / secondNum;
      break;
  }

  return result;
}

$(document).ready(() => {
  let form = $('form');

  form.on('submit', event => {
    event.preventDefault();

    let firstNumberValue = $('#first-number').val();
    let secondNumberValue = $('#second-number').val();
    let operator = $('#operator').val();

    let result = performCalc(firstNumberValue, secondNumberValue, operator);
    $('h1').text(result);
  });
});