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