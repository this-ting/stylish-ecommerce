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
      "list": [cartItem, cartItem, cartItem]
    }
  }

// Check local storage for 'cart'

if (localStorage.getItem("cart") === null ) {
    console.log('there is no cart') 
    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`)
    
    //sets cart quantity
    let cartQty = JSON.parse(localStorage.getItem("cart")).order.list.length;
    document.querySelector(".cart-mobile-qty").innerHTML = cartQty
    document.querySelector(".cart-icon-qty").innerHTML = cartQty

} else {
    localStorage.getItem("cart")
    console.log('there is a cart')

    //sets cart quantity
    document.querySelector(".cart-mobile-qty").innerHTML = cartQty
    document.querySelector(".cart-icon-qty").innerHTML = cartQty
}

