/*
- Whenever we choose a classification from the drop down menu:
    - Obtain the value of that classification
    - Iterate through all the animals:
        - Hide any animals that do not contain that classification as a class

*/

let bear = document.querySelector('[value="Bear"]');
let turtle = document.querySelector('[value="Turtle"]');
let whale = document.querySelector('[value="Whale"]');
let salmon = document.querySelector('[value="Salmon"]');
let ostrich = document.querySelector('[value="Ostrich"]');

bear.className = ('Vertebrate Warm-blooded Mammal');
turtle.className = ('Vertebrate Cold-blooded');
whale.className = ('Vertebrate Warm-blooded Mammal');
salmon.className = ('Vertebrate Cold-blooded');
ostrich.className = ('Vertebrate Warm-blooded Bird');

let form = document.querySelector('form');
let animals = document.querySelector('#animals');
let classifications = document.querySelector('#animal-classifications');
let clear = document.querySelector('#clear');

classifications.addEventListener('change', event => {
   let classification = event.target.value;
   let animalCollection = [].slice.call(animals.children);
   
   animalCollection.forEach(animal => {         // Makes all animal options available when clicking another classification
      animal.style.display = 'inline';
   });

   
   animalCollection.forEach(animal => {
      if (!animal.classList.contains(classification)) {
          animal.style.display = 'none';
      }
   });   
});

animals.addEventListener('change', event => {
   let animal = document.querySelector(`[value=${event.target.value}]`);
   let classificationCollection = [].slice.call(classifications.children);

    classificationCollection.forEach(currentClass => {
           currentClass.style.display = 'inline';
       });

   classificationCollection.forEach(currentClass => {
       if (!animal.classList.contains(currentClass.value)) {
           currentClass.style.display = 'none';
       }
   });
});

clear.addEventListener('click', event => {
   event.preventDefault();

   [].slice.call(animals).forEach(animal => {
      animal.style.display = 'inline'; 
   });

   [].slice.call(classifications).forEach(classification => {
      classification.style.display = 'inline';
   });

   animals.value = 'Animals';
   classifications.value = 'Classifications';
});