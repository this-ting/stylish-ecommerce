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
}

// Check local storage for 'cart'
if (localStorage.getItem("cart") === null ) {
    console.log('there is no cart') 
    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);

    setCartQty(); // call setCartQty function
} else {
    localStorage.getItem("cart")
    console.log('there is a cart')

    setCartQty(); // call setCartQty function

}


//sets cart quantity
function setCartQty() {
    let cartQty = JSON.parse(localStorage.getItem("cart")).order.list;
    // if (cartQty === undefined || cartQty === null) {
    //     document.querySelector(".cart-mobile-qty").innerHTML = 0
    //     document.querySelector(".cart-icon-qty").innerHTML = 0
    // } else {
        document.querySelector(".cart-mobile-qty").innerHTML = cartQty.length
        document.querySelector(".cart-icon-qty").innerHTML = cartQty.length
    // }
}

