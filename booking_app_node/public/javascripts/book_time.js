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
*/

function populateStaffSchedules(allSchedules) {
  let dropdown = document.querySelector('select');

  allSchedules.forEach(currentSchedule => {
    
    let newOption = document.createElement('option');
    newOption.textContent = currentSchedule;
  
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
    let date = currentSchedule.date;
    let time = currentSchedule.time;

    let string = `${staffMemberName} | ${date} | ${time}`;

    allSchedulesForCurrentStaff.push(string);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let staffList = document.querySelector('select');
  
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
});