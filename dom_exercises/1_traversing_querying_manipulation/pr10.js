// Create a header element
const node1 = document.createElement('header');
// Create a text node
const node2 = document.createTextNode('Dynamic Content');

// We use `innerHTML` to set the html content of node1
/*
node1 should look like the following:
<header>
  <p>Hello World!</p>
</header>
 */
node1.innerHTML = '<p>Hello World!</p>';
// We append `node1` to the end of body
document.body.appendChild(node1);
// Insert node2 right before the `p` element in `node1`
document.body.firstElementChild.insertBefore(node2, node1.firstElementChild);

// Creating a new element `h1`
/*
<h1>
  Dynamic Content
</h1>
*/
const node3 = document.createElement('h1');
// node2 is moved from the `header` node to `node3`
node3.appendChild(node2);
// node 3 is, `h1` inserted before the `p` element
document.body.firstElementChild.insertBefore(node3, node1.firstElementChild);

// Setting the attribute `id` of `header` to `header`
node1.setAttribute('id', 'header');
// Adding a class to `h1` with value `emphasis`
node3.classList.add('emphasis');
// adding a class to `h1` with value `light`
node3.classList.add('light');

// Create an element `style`
const node4 = document.createElement('style');
const css1 = ".emphasis { font-weight: bold; }";
const css2 = ".light { color: gray; }";
node4.type = 'text/css';

// Append both text nodes to `style`
node4.appendChild(document.createTextNode(css1));
node4.appendChild(document.createTextNode(css2));

// Append `style` to `head`
document.head.appendChild(node4);


// <!doctype html>
// <html>
//   <head>
//     <title>HTML Imaging</title>
//     <style type="text/css">
//       .emphasis { font-weight: bold; }
//       .light { color: gray; }
//     </style>
//   </head>
//   <body>
//     <header id="header">
//       <h1 class="emphasis light">Dynamic Content</h1>
//       <p>Hello World!</p>
//     </header>
//   </body>
// </html>