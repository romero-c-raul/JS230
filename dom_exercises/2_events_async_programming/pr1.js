function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...callbacks) {
  let timer = 1;
  let intervalToken;
  
  intervalToken = setInterval(() => {
    if (timer > callbacks.length * 2) {
      clearInterval(intervalToken);
      return;
    }

    console.log(timer);
    timer += 1;
  }, 1000);

  callbacks.forEach(callback => {
    let min = 1;
    let max = callbacks.length * 2;
    let randomDelay = Math.floor(Math.random() * (max - min + 1) + min);
    
    setTimeout(callback, randomDelay * 1000);
  });
}

randomizer(callback1, callback2, callback3);
// randomizer(callback1, callback2);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6