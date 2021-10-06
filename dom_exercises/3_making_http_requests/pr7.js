/*
PROBLEM
  - Implement two functions:
    - One for cancelling schedules
    - One for cancelling of bookings

RULES
  - The functions should take a `scheduleId` and `bookingId` as arguments respectively

ALGORITHM (Cancel Schedule);
  - Given the `schedule_id` of the schedule you want to cancel
  - Submit a `DELETE` request to "http://localhost:3000/api/schedules/:schedule_id"
    - Where the `schedule_id` is a number type
  - If request status is 204:
    - Alert `Schedule deleted`
  - If request status is 404
    - Alert the response

ALGORITHM (Cancel Booking)
  - Given the `booking_id` of the schedule you want to
  - Submit a `PUT` request to "http://localhost:3000/api/bookings/:booking_id"
    - Where `booking_id` is a number type
   - If request status is 204:
    - Alert `Booking deleted`
  - If request status is 404
    - Alert the response

** Both bookingId and scheduleId are the Id of the schedule you want to either delete or remove the booking from;
*/

function cancelSchedule(scheduleId) {
  let request = new XMLHttpRequest();
  request.open('DELETE', "http://localhost:3000/api/schedules/" + scheduleId);
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 204) {
      alert("Schedule canceled");
    } else {
      alert(request.response);
    }
  });
}

function cancelBooking(bookingId) {
  let request = new XMLHttpRequest();
  request.open("PUT", "http://localhost:3000/api/bookings/" + bookingId);
  request.send();

  request.addEventListener('load', () => {
    if (request.status === 204) {
      alert("Booking canceled");
    } else {
      alert(request.response);
    }
  });
}