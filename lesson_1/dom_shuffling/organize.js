/*
- The header has to be before main
*/

let header = document.body.getElementsByTagName('header')[1];
let body = document.body;
body.insertAdjacentElement('afterbegin', header);

let main = body.querySelector('main');
let h1 = main.querySelector('h1');
header.insertAdjacentElement('afterbegin', h1);

let article = main.querySelector('article');
let figures = main.querySelectorAll('figure');
let topFigure = figures[1];
let bottomFigure = figures[0];
article.insertAdjacentElement('beforeend', topFigure);
article.insertAdjacentElement('beforeend', bottomFigure);
