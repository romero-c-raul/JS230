/*
PROBLEM
  - Implement the markup and JavaScript for booking a schedule
  
MENTAL MODEL
  - Markup has three elements:
    - Heading
    - Select drop down
    - Email field
    - Submit button

ALGORITHM (MAKE BASIC MARKUP)
  - Add a heading
  - Add a form with three elements
    - Select
    - Email
    - Submit button

ALGORITHM (MAKE DROPDOWN LIST)
  - Create an event handler for `DOMContentLoaded`
    - Create an an event handler for a click on the select dropdown list
      - Use populateStaffSchedules function to populate staff
      - Need to add value to each schedule, it should be the staff id
        - We could possibly modify `createScheduleOption` to return the string AND staff `id` in a nested array

ALGORITHM (SUBMIT REQUEST)
  - Create an object with the values and stringify it
  - Create a request
  - Set the header to 'application/json'

ALGORITHM (HANDLING RESPONSE)
  - Handle situations where you have status codes: 404 and 204
  - If status code 404:
    - Add markup with the following format:
      - Heading: Please provide new student details
      - Form with 4 elements: email, name, booking sequents, and submit
    - Populate automatically the email and booking sequence fields
    
    - Submit a post request to "api/students"
      - If the request is successful:
        - Alert that the student was succesfully added to the database
        - Submit a post request for the current booking
        - Alert that the booking is now succesful
      - If the request is not successful:
        - Alert the response 

ALGORITHM (NEW STUDENT MARKUP)
  - Create a new div and append to the end of the body
    - Create a new heading and append to the end of div
    - Create a new form with three fields and a button and append to the end of the div

ALGORITHM (HANDLE FORM SUBMIT REQUEST)
  - You have two scenarios:
    - Status code 201:
      - Alert the request response
      - Submit the first form
      - Alert that the form was submitted succesfully
      - Reset page
    - Status code 403:
    - Status code 400;
*/    

function populateStaffSchedules(allSchedules) {
  let dropdown = document.querySelector('select');

  allSchedules.forEach(pair => {
    let currentSchedule = pair[0];

    let newOption = document.createElement('option');
    newOption.textContent = currentSchedule;
    newOption.setAttribute('schedule_id', pair[1]);
    newOption.value = pair[1];
  
    dropdown.appendChild(newOption);
  });
}

function buildStaffAndSchedules(data) {
  for(key in data) {
    let currentStaffMember = data[key];
    let staffMemberName = currentStaffMember.name;
    let staffMemberId = currentStaffMember.id;

    let request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:3000/api/schedules/' + staffMemberId);
    request.responseType = 'json';
    request.send();

    
    request.addEventListener('load', () => {
      let availableSchedules = request.response;
      let allSchedulesForCurrentStaff = [];

      createScheduleOption(availableSchedules, staffMemberName, allSchedulesForCurrentStaff);
      populateStaffSchedules(allSchedulesForCurrentStaff);
    });
  }
}

function createScheduleOption(availableSchedules, staffMemberName, allSchedulesForCurrentStaff) {
  for(key in availableSchedules) {
    let currentSchedule = availableSchedules[key];
    
    let studentEmail = currentSchedule.student_email;

    if (studentEmail !== null) { continue }

    let date = currentSchedule.date;
    let time = currentSchedule.time;

    let string = `${staffMemberName} | ${date} | ${time}`;

    allSchedulesForCurrentStaff.push([string, currentSchedule.id]);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let staffList = document.querySelector('select');
  let form = document.querySelector('form');
  
  staffList.addEventListener('click', event => {
    let dropdown = document.querySelector('select');

    if (dropdown.length < 1) {
      let request = new XMLHttpRequest();
  
      request.open('GET', 'http://localhost:3000/api/staff_members');
      request.responseType = 'json';
      request.send();
  
      request.addEventListener('load', event => {
        let data = request.response;
        buildStaffAndSchedules(data);
      });
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    
    let formElements = form.elements;
    console.log(formElements);
    let id = Number(formElements[0].value);
    let studentEmail = formElements[1].value;

    let data = {
      id,
      student_email: studentEmail
    }

    let json = JSON.stringify(data);
    let request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:3000/api/bookings');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(json);

    request.addEventListener('load', event => {
      let response = request.response;
      let status = request.status;
      console.log(status);
      console.log(response);

      if (status === 404) {
        alert(response);

        let bookingSequence = Number(response.split(" ").slice(-1)[0]);
        addNewStudentMarkup(data, bookingSequence);
      } else {
        alert('Booked');
        location.reload();
      }
    });
  });
});

function addNewStudentMarkup(data, bookingSequence) {
  let div = document.createElement('div');
  div.setAttribute('id', 'student-details');

  let request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/add_student.html');
  request.send();

  request.addEventListener('load', event => {
    div.innerHTML = request.response;    
    let form = div.querySelector('form');
    let emailField = form.elements[0];
    let nameField = form.elements[1];
    let bookingSequenceField = form.elements[2]; 

    emailField.value = data.student_email;
    bookingSequenceField.value = bookingSequence;

    console.log(bookingSequence);
    
    div.style.backgroundColor = 'grey';
    document.body.appendChild(div);

    form.addEventListener('submit', (event) =>  {
      event.preventDefault();
      
      let request = new XMLHttpRequest();
      let data = {
        email: emailField.value,
        name: nameField.value,
        booking_sequence: bookingSequenceField.value,
      };
      let json = JSON.stringify(data);

      request.open('POST', 'http://localhost:3000/api/students');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(json);

      request.addEventListener('load', () => {
        let response = request.response;

        if (request.status === 201) {
          alert(response);

          let originalFormSubmit = document.querySelector('form').elements[2];
          originalFormSubmit.click();
        } else {
          alert(response);
        }
      });
    });
  });
}