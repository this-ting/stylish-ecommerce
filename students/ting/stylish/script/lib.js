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
      console.log("API success!");
      const list = JSON.parse(xhr.responseText);
      callback(list);
    } else {
      // This will run when it's not
      console.log("The request failed!");
    }
  };
  xhr.open("GET", src);
  xhr.send();
}

/* ==========================================================================
   Search Function
   ========================================================================== */
const APIsearch = `${APIproducts}search?keyword=`;
function searchProduct(src, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("Search Success!");
      let search = JSON.parse(xhr.responseText);
      callback(search);
    } else {
      console.log("The request has failed");
    }
  };
  xhr.open("GET", src, true);
  xhr.send();
}

// Function will check if there is such product then render appropriate output
function searchRender(search) {
  if (search.error === "Wrong Request") {
    // Make Existing Products disappear
    container.removeChild(container.firstElementChild);

    // No Product Message
    const noProduct = document.createElement("div");
    noProduct.setAttribute("class", "noProduct");
    noProduct.textContent = "請輸入搜尋的產品哦";

    container.appendChild(noProduct);
  } else if (search.data.length === 0) {
    // Make Existing Products disappear
    container.removeChild(container.firstElementChild);

    // No Product Message
    const noProduct = document.createElement("div");
    noProduct.setAttribute("class", "noProduct");
    noProduct.textContent = "Error 404 沒有所搜尋的產品哦";

    container.appendChild(noProduct);
  } else {
    // Make homepage's Products disappear
    render(search);
  }
  // remove event listener
  window.removeEventListener("scroll", infiniteScroll);
}

// Mobile search text input pop up
function showMobileSearch() {
  // Remove top header
  const topHeader = document.getElementById("top-header");

  topHeader.removeChild(topHeader.firstElementChild);
  topHeader.removeChild(topHeader.lastElementChild);

  // Add in text input
  const searchFormMobile = document.createElement("form");
  const searchInputMobile = document.createElement("input");
  searchInputMobile.setAttribute("class", "nav-mobile-search");
  searchInputMobile.setAttribute("type", "text");

  const searchSubmitMobile = document.createElement("button");
  searchSubmitMobile.style.visibility = "hidden";

  topHeader.appendChild(searchFormMobile);
  searchFormMobile.appendChild(searchInputMobile);
  searchFormMobile.appendChild(searchSubmitMobile);
  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    searchProduct(`${APIsearch}${searchInputMobile.value}`, searchRender);
  });
}

// Call Search function for desktop
const searchInput = document.querySelector(".nav-search").value;
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  searchProduct(`${APIsearch}${searchInput.value}`, searchRender);
});

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
  prime: "",
  order: {
    shipping: "delivery",
    payment: "credit_card",
    subtotal: "",
    freight: "",
    total: "",
    recipient: {
      name: "",
      phone: "",
      email: "",
      address: "",
      time: ""
    },
    list: []
  }
};

// Set up cart quantity update function
function setCartQty() {
  const cartQty = JSON.parse(localStorage.getItem("cart")).order.list;
  document.querySelector(".cart-mobile-qty").innerHTML = cartQty.length;
  document.querySelector(".cart-icon-qty").innerHTML = cartQty.length;
}

// Check local storage for 'cart'
if (localStorage.getItem("cart") === null) {
  localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
  setCartQty(); // call setCartQty function
} else {
  localStorage.getItem("cart");
  setCartQty(); // call setCartQty function
}
