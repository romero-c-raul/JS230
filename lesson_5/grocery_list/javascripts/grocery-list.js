/*
PROBLEM
  - Create a single-page application for creating a grocery list
  - When we load the page, we'll be presented with a form that asks us for the item's name and quantity as two text fields
  - Once the form is completed and submitted, a new item will be added to our grocery list

RULES
  - Add an event handler for the submit event on the form
  - Retrieve the item name and value from the form elements
  - Use a quantity of 1 if the quantity field is left empty
  - Create a new list item object using the name and quantity as strings
  - Add the list item to the grocery list portion of the HTML
  - Clear the form's contents

ALGORITHM
  - Add an event listener to the add button
    - Obtain the item name
    - Obtain the quantity
      - If the quantity is left empty, add the value of 1
    - Add the item to the end of the list
    - Reset form
*/

document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let itemName = document.querySelector('#name').value;

    if (!itemName) {
      alert('Please enter an item name');
      return;
    }

    let itemQuantity = document.querySelector('#quantity').value || 1;
    let listString = `${itemQuantity} ${itemName}`;

    let listItem = document.createElement('li')
    listItem.textContent = listString;

    document.querySelector('ul').appendChild(listItem);
    form.reset();
  });
});