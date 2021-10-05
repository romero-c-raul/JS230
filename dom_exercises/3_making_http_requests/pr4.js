/*
PROBLEM
  - Implemeent the markup and JavaScript to add one or more schedules. You should handle and inform the user of the different possible responses of the server

RULES
  - Format will be (from top to bottom):
    - Add more schedules button
    - Form(s)
    - Submit button
  - Each form (or schedule) should have three fields:
    - Staff name (drop down)
    - Date: text input
    - Time: text input
  - 

MENTAL MODEL
  - Populate select field in form
    - Obtain all the available staff
    - Iterate through all the staff names
    - Add them as option children of select
  - Submit form
*/

function populateStaffNames(data, scheduleForm) {
  for(key in data) {
    let currentStaffMember = data[key];
    let staffMemberName = currentStaffMember.name;

    let newOption = document.createElement('option');
    newOption.value = currentStaffMember.id;
    newOption.textContent = staffMemberName;
    newOption.setAttribute('staff_id', currentStaffMember.id);

    scheduleForm.appendChild(newOption);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  
  request.open('GET', 'http://localhost:3000/api/staff_members');
  request.responseType = 'json';
  
  request.addEventListener('load', event => {
    let data = request.response;
    let scheduleForm = document.querySelector('select');

    populateStaffNames(data, scheduleForm);
  });

  request.send();

  let submitForm = document.querySelector('#submit-schedules');

  submitForm.addEventListener('click', event => {
    let allForms = document.querySelectorAll('form');
    let allFormsArray = [].slice.call(allForms);
    let allSchedules = {
      schedules: []
    };
    
    allFormsArray.forEach(currentForm => {
      let currentSchedule = {
        staff_id: currentForm.elements[0].value,
        date: currentForm.elements[1].value.toString(),
        time: currentForm.elements[2].value.toString(),
      }

      allSchedules.schedules.push(currentSchedule);
    });

    let json = JSON.stringify(allSchedules);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/schedules');
    request.setRequestHeader('Content-Type', 'application/json');


    request.addEventListener('load', () => {
      alert(request.response);
    });

    request.addEventListener('error', () => {
      console.log(request.response);
    });

    request.send(json);
  });

  let addScheduleForm = document.querySelector('#add-schedule');

  addScheduleForm.addEventListener('click', () => {
    let formCount = document.forms.length;
    let scheduleCopy = document.querySelector('.form-outline').cloneNode(true);

    scheduleCopy.children[0].textContent = `Schedule ${formCount + 1}`;

    document.body.insertBefore(scheduleCopy, submitForm);
  });
});