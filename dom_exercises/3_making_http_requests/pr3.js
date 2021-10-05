/*
PROBLEM
  - Implement a form for adding new staff, then use the booking app API to add the staff to the database.
    Your implementation should handle different response of the server and inform the user of the outcome

RULES
  - For the form:
    - It has two fields, email and name
    - One submit button

  - Form validation:
    - Raise an alert "Staff can not be created. Check your inputs." for the following:
      - Both fields empty 
      - One field empty and one filled out

MENTAL MODEL
  - Create a new page with a form in it
  - Run a script on a page that enables us to add staff if and only if both fields have data
    - Server should handle this validation from their side, we should only worry about how we 
      handle the response sent back

ALGORITHM
  - Create a new html file in the `public` directory
  - Implement a form with two fiels (email, name) and a button (submit)

  - Create a new POST request to "/api/staff_members"
    - If staff was successfully added, alert "Succesfully created staff with id #{id}"
    - If an error was raised (Maybe check status?) alert "Staff can not be created. Check your inputs"
*/

addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let data = new FormData(form);
    
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/staff_members');

    request.addEventListener('load', () => {

      if (request.status === 400) {
        alert(request.response);
      } else if (request.status === 201) {
        let response = JSON.parse(request.response)
        alert(`Succesfully created staff with id: ${response.id}`);
      }
    });

    request.send(data);
  });
});