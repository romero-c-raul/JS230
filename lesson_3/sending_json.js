let request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

let data = {name: 'Leegdo', sku: 'lrg03', price: 2500 };
let json = JSON.stringify(data);

request.addEventListener('load', () => {
   console.log(`This product was added: ${request.response}`);
});

request.send(json);