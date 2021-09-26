// 1. 

// function delayLog() {
//   for(let num = 1; num <= 10; num += 1) {
//     setTimeout(function() {
//       console.log(num);
//     }, num * 1000);
//   }
// }

// delayLog();


// 2.

// setTimeout(() => {            // 1
//   console.log('Once');        // 5
// }, 1000);

// setTimeout(() => {            // 2
//   console.log('upon');        // 7
// }, 3000);

// setTimeout(() => {            // 3
//   console.log('a');           // 6
// }, 2000);                     

// setTimeout(() => {            // 4
//   console.log('time');        // 8
// }, 4000);


// 3. 

// setTimeout(() => {                // 4
//   setTimeout(() => {
//     q();                          // 9
//   }, 15);

//   d();                            // 5

//   setTimeout(() => {
//     n();                          // 7
//   }, 5);

//   z();                            // 6
// }, 10);

// setTimeout(() => {                // 8
//   s();                            
// }, 20);

// setTimeout(() => {          // 1
//   f();                      // 2
// });

// g();                        // 3


// f, g, d, z, n, s, q  ---> Wrong
// g, f, d, z, n, s, q  ----> Correct answer
  // This is because the setTimeout function `f` is inside of does not execute until the next even cycle 


// 4. 

/*
PROBLEM:
  - Write a function that takes two arguments: a callback and a time duration in seconds
    - The function should wait for the indicated period and then invoke the callback function
 */

function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}