/*
PROBLEM
  - Implement the markup and JavaScript to view bookings made by students
  - The view of bookings should have two levels od detail
    - The first level shows only a list of dates that have bookings
    - The second level becomes visible only when a date is clicked and shows a nested list of booking details for the data

MENTAL MODEL
  - Need to retrieve all dates that have bookings and add them to first level
  - Need to retrieve all booking details for the particular booking date

ALGORITHM (Retrieve dates with bookings)
  - Perform a get request for /api/bookings 
    - This returns an array of dates in string format
  - Iterate through every date and add it as a list item to the first level on the html
*/

document.addEventListener('DOMContentLoaded', () => {
  let request = new XMLHttpRequest();
  
  request.open('GET', 'http://localhost:3000/api/bookings');
  request.send();

  request.addEventListener('load', event => {
    let allDates = JSON.parse(request.response);
    addAllDatesToList(allDates);

    let firstLevel = document.querySelector('#first-level');

    firstLevel.addEventListener('click', event => {
      let target = event.target;
      let targetDate = target.textContent;

      let request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/api/bookings/' + targetDate);
      request.send();

      request.addEventListener('load', () => {
        let response = JSON.parse(request.response);

        populateList(target, response); 
      });
    });
  });
});

function populateList(target, response) {
  let allDetails = [].slice.call(response);
  let newList = document.createElement('ul');
  target.appendChild(newList);

  allDetails.forEach(currentDetail => {
    let stringDetails = `${currentDetail[0]} | ${currentDetail[1]} | ${currentDetail[2]}`;
    let newListItem = document.createElement('li');
    newListItem.textContent = stringDetails;
    
    newList.appendChild(newListItem);
  });
}

function addAllDatesToList(allDates) {
  let allDatesArr = [].slice.call(allDates);
  let firstLevelList = document.querySelector('#first-level');
  
  allDatesArr.forEach(currentDate => {
    let newListItem = document.createElement('li');
    newListItem.textContent = currentDate;

    firstLevelList.appendChild(newListItem);
  });
}