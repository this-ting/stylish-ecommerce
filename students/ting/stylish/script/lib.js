/* ==========================================================================
   Library of functions
   ========================================================================== */
// Destination of API
const API = `https://api.appworks-school.tw/api/1.0`;
const APIproducts = `${API}/products/`;


// Set up GET function for API
function callAPI(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('success!');
            const list = JSON.parse(xhr.responseText);
            // console.log(list.data[0].id);
            haveNext = list.paging; // for product paging
            callback(list);
        } else {
            // This will run when it's not
            console.log('The request failed!');
        };
    }
    xhr.open('GET', src);
    xhr.send();
};

// Set up cart local storage layout

let cartItem = {
    id: 123456,
    name: "洋裝",
    price: 299,
    color: {
        name: "blue",
        code: "FFFFFF"
    },
    size: "S",
    qty: 1
    }

// let cartList = {`${cartItem}`}; // an array of objects for each product bought
  /* [
    {
      "id": [Product ID],
      "name": [Product Name],
      "price": [Product Unit Price],
      "color": {
        "name": [Product Variant Color Name],
        "code": [Product Variant Color HexCode]
      },
      "size": [Product Variant Size],
      "qty": [Quantity]
    }
  ] */


  let cartDetails = {
    "prime": "", 
    "order": {
      "shipping": "delivery",
      "payment": "credit_card",
      "subtotal": "", 
      "freight": "", 
      "total": "",
      "recipient": {
        "name": "", 
        "phone": "", 
        "email": "",
        "address": "", 
        "time": "", 
      },
      "list": [
        {
        id: 123456,
        main_image: "https://api.appworks-school.tw/assets/201807242222/main.jpg",
        name: "洋裝",
        price: 299,
        color: {
            name: "blue",
            code: "FFFFFF"
            },
        size: "S",
        qty: 1
        },
        {
        id: 123456,
        main_image: "https://api.appworks-school.tw/assets/201807242222/main.jpg",
        name: "洋裝",
        price: 299,
        color: {
            name: "blue",
            code: "FFFFFF"
            },
        size: "S",
        qty: 1
        }
    ]
    }
  }

// Check local storage for 'cart'
if (localStorage.getItem("cart") === null ) {
    console.log('there is no cart') 
    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`)

} else {
    localStorage.getItem("cart")
    console.log('there is a cart')
}

