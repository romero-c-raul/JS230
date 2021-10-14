/*
MENTAL MODEL
  - When page loads, first image in gallery should be highlighted and displayed by default
  - Whenever we click on another image:
    - That new image thumbnail must be highlighted
    - Replace the source of the main picture to the same source as the one in the thumbnail image you clicked on
*/

document.addEventListener('DOMContentLoaded', () => {
  let allImages = document.querySelectorAll('li img');
  let imageList = document.querySelector('ul');

  function addFocus(element) {
    let imageArr = [].slice.call(allImages);

    imageArr.forEach(image => {
      image.classList.remove('focus');
    });

    element.classList.add('focus');
  }

  function replacePreviousImage(currentImage) {
    let currentImageSource = currentImage.src;
    let displayedImage = document.querySelector('figure img');
    $(displayedImage).fadeOut(400);

    setTimeout(() => {
      $(displayedImage).fadeIn();
      displayedImage.setAttribute('src', currentImageSource);
    }, 400);
  }

  imageList.addEventListener('click', event => {
    let currentImage = event.target;

    if (currentImage.tagName !== 'IMG') {
      return;
    }

    addFocus(currentImage);
    replacePreviousImage(currentImage);
  });
});
