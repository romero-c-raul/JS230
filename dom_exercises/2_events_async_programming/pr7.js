function clearHighlights() {
  let allArticles = document.querySelector('main').children;
  [].slice.call(allArticles).forEach(currentArticle => {
      currentArticle.classList.remove('highlight');
  });

  main.classList.remove('highlight');
}

let list = document.querySelector("ul");
let main = document.querySelector("main");
let header = document.querySelector('header');

list.addEventListener('click', event => {
  clearHighlights();

  if (event.target.tagName == 'A'){
      let articleLink = event.target;
      let elementId = '#' + articleLink.href.split("#").slice(-1);
      let currentArticle = document.querySelector(elementId);

      currentArticle.classList.add('highlight');
  }

  console.log('triggering list!');
});

main.addEventListener('click', event => {
  clearHighlights();

  let elementClicked = event.target;
  console.log(elementClicked);

  if (elementClicked.tagName === 'MAIN' || elementClicked.tagName === 'H1') {
      main.classList.add('highlight');
      return;
  }

  let article = elementClicked.closest('article');
  article.classList.add('highlight');
});

header.addEventListener('click', event => {
  clearHighlights();

  main.classList.add('highlight');
}, true);