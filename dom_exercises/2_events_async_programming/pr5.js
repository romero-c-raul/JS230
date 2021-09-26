let main = document.querySelector('main');

main.addEventListener('contextmenu', event => {
  event.preventDefault();
  let name = event.target.textContent.trim().split(' ')[0];
  alert(name);
});