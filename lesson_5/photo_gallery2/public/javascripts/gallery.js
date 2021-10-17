document.addEventListener('DOMContentLoaded', () => {
  const templates = {};
  let photos;

  // Compile all the templates and store them in the `templates` object
  document.querySelectorAll('script[type="text/x-handlebars"]').forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl.innerHTML);
  });

  // Registering the partial template for later use
  let partial = document.querySelector('script[data-type="partial"]');
  Handlebars.registerPartial(partial["id"], partial.innerHTML);

  function renderPhotos() {
    let slides = document.querySelector('#slides');
    slides.insertAdjacentHTML('afterbegin', templates.photos({photos: photos}));
  }

  function renderPhotoInformation(idx) {
    let photoInfoHeader = document.querySelector('section > header');

    let photo = photos.filter(item => {
      return item.id === idx;
    })[0];

    photoInfoHeader.insertAdjacentHTML('afterbegin', templates.photo_information(photo));
  }

  fetch('/photos')
  .then(response => response.json())
  .then(json => {
    photos = json;
    renderPhotos(json);
    renderPhotoInformation(photos[0].id);
  });
});