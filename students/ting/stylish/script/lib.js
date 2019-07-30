/* ==========================================================================
   Call API
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
            console.log('API success!');
            const list = JSON.parse(xhr.responseText);
            callback(list);
        } else {
            // This will run when it's not
            console.log('The request failed!');
        };
    }
    xhr.open('GET', src);
    xhr.send();
};

/* ==========================================================================
   Shopping cart to local storage
   ========================================================================== */
/* 
1. Upon loading, check if local storage has 'cart' key
2. If not, add template for 'cart' value
3. If has, update cart icon quantity
*/

// Set up cart local storage layout
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
        "list": []
    }
};

//Set up cart quantity update function
function setCartQty() {
    let cartQty = JSON.parse(localStorage.getItem("cart")).order.list;
    document.querySelector(".cart-mobile-qty").innerHTML = cartQty.length;
    document.querySelector(".cart-icon-qty").innerHTML = cartQty.length;
};

// Check local storage for 'cart'
if (localStorage.getItem("cart") === null ) {
    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
    setCartQty(); // call setCartQty function
} else {
    localStorage.getItem("cart");
    setCartQty(); // call setCartQty function
};

/* ==========================================================================
 Initialize Facebook JavaScript SDK
 ========================================================================== */

  
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  };
  
