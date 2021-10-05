// My Solution
/*
PROBLEM
  - Implement a function that retrieves all the schedules that are available
    - If one or more schedules are available:
      - Tally the count of schedules for each staff and alert the user of result as "key: value" pairs with the staff id as key
        and the count of schedules as the value
        - For example `staff {id}` would be `staff 1`: # of schedules
    - If there are no schedules available:
      - Alert the user that there are currently no schedules available for booking

ALGORITHM
  - Obtain all the schedules that are in the system
  - Tally the number of schedules each staff member has available
    - This will be done using an object literal, where the key is the staff id and the value is the number of schedules

  - If there are no schedules available:
    - Alert user
  - Else
    - Go through each key-value pair and alert it in the `staff ${id}: value` format
*/

function getAvailableSchedules() {
  let request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.responseType = 'json';
  request.timeout = 5000;

  request.addEventListener('load', () => {
    let data = request.response;
    let availableScheduleCount = {};

    for(key in data) {
      let currentSchedule = data[key];

      if (availableScheduleCount[currentSchedule.staff_id]) {
        availableScheduleCount[currentSchedule.staff_id] += 1;
      } else {
        availableScheduleCount[currentSchedule.staff_id] = 1;
      }
    }


    if (Object.keys(availableScheduleCount).length < 1) {
      alert('There are currently no schedules available for booking.');
    } else {
      let scheduleCountPairs = Object.entries(availableScheduleCount).map(pair => {
        return `staff ${pair[0]}: ${pair[1]}`;
      }).join('\n');

      alert(scheduleCountPairs);
    }
  });

  request.addEventListener('timeout', () => {
    alert('Request timed out. Please try again.')
  });

  request.addEventListener('loadend', () => {
    alert('The request has completed');
  });

  request.send();
}

getAvailableSchedules();


// LS solution
function retrieveSchedules() {
  const request = new XMLHttpRequest();

  // Be sure to change your host and port number accordingly
  request.open('GET','http://localhost:3000/api/schedules')
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(({staff_id}) => {
        const key = `staff ${String(staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('There are currently no schedules available for booking');
    }
  });

  request.addEventListener('timeout', event => {
    alert('It is taking longer than usual, please try again later.')
  });

  request.addEventListener('loadend', event => {
    alert('The request has completed.');
  });

  request.send();
}