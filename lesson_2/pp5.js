// 1. 

/*
HTML:

<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>

JS:

let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert(event.target.tagName));
elem1.addEventListener('click', event => alert(event.currentTarget.tagName));

- In the video, we see two event handlers being called
  - The first one outputs MAIN
  - The second one outputs DIV

- Sequence of events:
  1. `click` event listener on the `div#elem1` element listening in the bubbling phase
    - Alerts the `tagName` of  `main#elem4` since it is the `target` (what was clicked)
  2. `click` event listener on the `div#elem1` element  listening in the bubbling phase
    - Alerts the `tagName` of `div#elem1` since it is the `currentTarget` (what the event listener was called on)
*/


// 2. 
/* 
HTML:

<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>

JS:

let elem1 = document.querySelector('#elem1');

elem1.addEventListener('click', event => alert("bubbling"));
elem1.addEventListener('click', event => alert("capturing"), true);

- In the video, two event handlers are being called:
  - First one alerts capturing
  - Second one alerts bubbling

- Sequence of events:
  1. `click` event listener on `div#elem1` element listening in the capturing phase
    - This alerts 'capturing'
  2. `click` event listener on `div#elem1` element listening in the bubbling phase
    - This alerts 'bubbling'
*/


//3. 
/*
HTML:

<div id="elem1">1
  <section id="elem2">2
    <article id="elem3">3
      <main id="elem4">4
      </main>
    </article>
  </section>
</div>
<input type=text>

JS:

let elem1 = document.querySelector('#elem1');

document.addEventListener('keypress', event => {
  setTimeout(() => alert(event.code), 7000);
});

elem1.addEventListener('click', event => {
  setTimeout(() => alert(event.target.tagName), 7000);
});

- Sequence of events
  - `click` event listener on `div#elem1` that is listening in the bubbling phase
    - Alerts the tagname of the target (div#elem1) after 7 seconds
  - `keypress` event listener on `document` that is listening in the bubbling phase
    - Alerts the code of the key pressed after 7 seconds
  - `keypress` event listener on `document` that is listening in the bubbling phase
    - Alerts the code of the key pressed after 7 seconds
  - `click` event listener on `div#elem1` that is listening in the bubbling phase
    - Alerts the tagname of the target (main#elem4) after 7 seconds

*/