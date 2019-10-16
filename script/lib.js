/* eslint-disable no-unused-vars */
/* ==========================================================================
   Call API
   ========================================================================== */
// Destination of API
const API = `https://api.appworks-school.tw/api/1.0`;
const APIproducts = `${API}/products/`;

// Set up GET function for API
function callAPI(src, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      // This will run when the request is successful
      console.log('API success!');
      const list = JSON.parse(xhr.responseText);
      callback(list);
    } else {
      // This will run when it's not
      console.log('The request failed!');
    }
  };
  xhr.open('GET', src);
  xhr.send();
}

/* ==========================================================================
   Shopping cart to local storage
   ========================================================================== */
/* 
1. Upon loading, check if local storage has 'cart' key
2. If not, add template for 'cart' value
3. If has, update cart icon quantity
*/

// Set up cart local storage layout
const cartDetails = {
  prime: '',
  order: {
    shipping: 'delivery',
    payment: 'credit_card',
    subtotal: '',
    freight: '',
    total: '',
    recipient: {
      name: '',
      phone: '',
      email: '',
      address: '',
      time: '',
    },
    list: [],
  },
};

// Set up cart quantity update function
function setCartQty() {
  const cartQty = JSON.parse(localStorage.getItem('cart')).order.list;
  document.querySelector('.cart-mobile-qty').innerHTML = cartQty.length;
  document.querySelector('.cart-icon-qty').innerHTML = cartQty.length;
}

// Check local storage for 'cart'
if (localStorage.getItem('cart') === null) {
  localStorage.setItem('cart', `${JSON.stringify(cartDetails)}`);
  setCartQty(); // call setCartQty function
} else {
  localStorage.getItem('cart');
  setCartQty(); // call setCartQty function
}

/* ==========================================================================
   Search Function
   ========================================================================== */
const APIsearch = `${APIproducts}search?keyword=`;

// Mobile search text input pop up
function showMobileSearch() {
  // Remove top header
  const topHeader = document.getElementById('top-header');

  topHeader.removeChild(topHeader.firstElementChild);
  topHeader.removeChild(topHeader.lastElementChild);

  // Add in text input
  const searchFormMobile = document.createElement('form');
  const searchInputMobile = document.createElement('input');
  searchInputMobile.setAttribute('class', 'nav-mobile-search');
  searchInputMobile.setAttribute('type', 'text');

  const searchSubmitMobile = document.createElement('button');
  searchSubmitMobile.style.visibility = 'hidden';

  topHeader.appendChild(searchFormMobile);
  searchFormMobile.appendChild(searchInputMobile);
  searchFormMobile.appendChild(searchSubmitMobile);

  // Redirect search to index.html query string
  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    window.location.href = `index.html?search=${searchInputMobile.value}`;
    console.log('mobiel search submit');
  });
}

// Redirect search to index.html query string
function searchSubmit() {
  const searchInput = document.querySelector('.nav-search').value;
  window.location.href = `index.html?search=${searchInput}`;
}
