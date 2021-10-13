// 1. Use an element selector to find all h1 elements

$('h1');

// 2. Use an id selector to find the first h1 element

$('#site_title');

// 3. Use a descendant selector to find all the list items in the `article` element

$('article').find('li');
// or
$('article li');

// 4. Find the third list item from the article element

$('article li').eq(2); // This gets a jQuery object
//$('article li')[2]; // This returns the actual element

// 5. Find the table element, then find all the odd-numbered rows in that element

$('table').find('tr').filter((integer, _) => {
  return integer % 2 === 1;
});

// 6. Find the list item that contains the text ac ante, then locate the parent `li` element

$('li li').filter(":contains('ac ante')").parents('li');
// or
$("li li:contains('ac ante')").parents('li');

// 7. Find the list item that contains the text ac ante, then find and return the next element
$('li li:contains("ac ante")').next();

// 8. Find all the table cells in the table, then find the last cell from the collection
$('table td').last();
// or
$('table td').eq(-1);

// 9.Find all the table cells that do not have a class of "protected".

$('table td').not((index, element) => {
  return $(element).hasClass('protected');
});

$('td').not(".protected");
$('td:not(".protected")');

// 10. Find all the anchor elements that have an href value that begins with #.

$("a[href^='#']");


// 11. 

$("*[class*='block']") // My solution
$("[class*='block']")
