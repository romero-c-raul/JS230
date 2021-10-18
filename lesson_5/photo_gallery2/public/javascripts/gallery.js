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
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photoInfoHeader = document.querySelector('section > header');

    if (photoInfoHeader.children.length > 1) {
      photoInfoHeader.innerHTML = '';
    }

    let photo = photos.filter(item => {
      return item.id === idx;
    })[0];

    console.log(photo);

    console.log(templates.photo_information(photo));

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

  let slideshow = {
    displayPreviousElement() {
      this.slidesParent.insertAdjacentElement('afterBegin', this.allSlides[this.allSlides.length - 1]);
      // this.setFormValue(this.allSlides[0]);
    },
  
    displayNextElement() {
      this.slidesParent.insertAdjacentElement('beforeend', this.allSlides[0]);
      // this.setFormValue(this.allSlides[0])
    },

    setFormValue(element) {
      document.querySelector('input[type=hidden]').value = element.dataset.id;
    },
  
    resetComments() {
      let commentsList = document.querySelector('#comments ul');
      commentsList.innerHTML = '';
    },

    bind() {
      let anchors = document.querySelector('#slideshow ul');
      let likeOrFavoriteSection = document.querySelector('section header');
      
      anchors.addEventListener('click', (event) => { this.navigateSlides(event) });
      likeOrFavoriteSection.addEventListener('click', event => { this.handleLikeOrFavorite(event) });
      // this.form.addEventListener('submit', event => { this.submitForm(event)}, true);
    },

    submitForm(event) {
      event.preventDefault();
      let formData = new FormData(this.form);
      let urlString = new URLSearchParams(formData).toString();
      let path = event.target.action;

      console.log(urlString);

      fetch(path, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: urlString,
      })
      .then(response => response.json())
      .then(json => {
        let commentsList = document.querySelector('#comments ul');
        let newComment = templates.photo_comment(json);
        commentsList.insertAdjacentHTML('beforeend',newComment);
        this.form.reset();
      });
    },

    handleLikeOrFavorite(event) {
      event.preventDefault();
      let target = event.target;

      console.log('Handle like or favorite');
      if (target.tagName !== 'A') {
        return;
      }

      let path = target.getAttribute('href');
      let displayedSlideId = this.allSlides[0].dataset.id;
      
      fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          photo_id: displayedSlideId 
        })
      })
      .then(response => response.json())
      .then(json => {
        let total = json.total;
        let newString = target.textContent.replace(/\d+/, total);
        target.textContent = newString;
      });
    },

    navigateSlides(event) {
      let target = event.target;

      if (target.tagName !== 'A') {
        return;
      } 

      event.preventDefault();

      if (target.className === 'prev') {
        this.displayPreviousElement();
      } else if (target.className === 'next') {
        this.displayNextElement();
      }

      let displayedElement = document.querySelector('figure[data-id]');
      let displayedElementId = Number(displayedElement.dataset.id);
      
      this.resetComments();

      console.log(displayedElementId);

      this.updatePhotoJson();
      renderPhotoInformation(displayedElementId);
      getCommentsFor(displayedElementId);
    },

    updatePhotoJson() {
      fetch('/photos')
      .then(response => response.json())
      .then(json => {
        photos = json;
      });
    },
    displayedSlide() {
      this.slidesParent.children[0];
    },

    init() {
      this.slidesParent = document.querySelector('#slides');
      this.allSlides = this.slidesParent.children;
      this.form = document.querySelector('form');
      this.bind();
    },
  }

  fetch('/photos')
  .then(response => response.json())
  .then(json => {
    photos = json;
    renderPhotos(json);
    renderPhotoInformation(photos[0].id);
    getCommentsFor(photos[0].id);    
    slideshow.init();
  });
});