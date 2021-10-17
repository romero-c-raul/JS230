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
    slides.insertAdjacentHTML('beforeend', templates.photos({photos: photos}));
  }

  function renderPhotoInformation(idx) {
    let photoInfoHeader = document.querySelector('section > header');

    let photo = photos.filter(item => {
      return item.id === idx;
    })[0];

    photoInfoHeader.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch(`/comments?photo_id=${idx}`)
    .then(response => response.json())
    .then(comments => {
      let commentsList = document.querySelector('#comments ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comments({comments: comments}));
    });
  }

  fetch('/photos')
  .then(response => response.json())
  .then(json => {
    photos = json;
    renderPhotos(json);
    renderPhotoInformation(photos[0].id);
    getCommentsFor(photos[0].id);    
  });
});