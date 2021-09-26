let cursorInterval;

document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');

    if (!cursorInterval) {
      cursorInterval = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }
  });
});

document.addEventListener('click', event => {
  clearInterval(cursorInterval);
  let textField = document.querySelector('.text-field');

  textField.classList.remove('focused');
  textField.classList.remove('cursor');
});

document.addEventListener('keydown', event => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');

  if (textField.classList.contains('focused')) {
    if (event.key === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    } else {
      content.textContent += event.key;
    }
  }
});