/* ==========================================================================
   Week 1 Part 3
   ========================================================================== */
// Destination of API
const API = `https://api.appworks-school.tw/api/1.0/products/`

// Set up GET function
let haveNext;
let category;
const xhr = new XMLHttpRequest();
function productLoad(src, callback) {
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('success!');
            const list = JSON.parse(xhr.responseText);
            console.log(list);
            haveNext = list.paging;
            console.log(haveNext);
            category = list.data[0].category
            console.log(category);
            callback(list);
        } else {
            // This will run when it's not
            console.log('The request failed!');
        };
    }
    xhr.open('GET', src , true);
    xhr.send();
};

// Set up render function
const container = document.getElementById('main-content')

function render(list) {
    // Make homepage's Products disappear
    container.removeChild(container.firstElementChild);

    const products = document.createElement('div')
    products.setAttribute('class', 'products')

    const productData = list.data;
    for (let i = 0; i < productData.length; i++) {
        // Individual product containter
        const product = document.createElement('div')
        product.setAttribute('class', 'product')

        // Product Main Image
        const productImg = document.createElement('img')
        productImg.src = productData[i].main_image
        
        // Product Color Types
        const productColor = document.createElement('div')
        productColor.setAttribute('class', 'color')
        const colorBox = productData[i].colors
        for (let a = 0; a < colorBox.length; a++) {
            productColor.style.backgroundColor = `#`+colorBox[a].code
        }

        // Product Name
        const productName = document.createElement('div')
        productName.setAttribute('class', 'name')
        productName.textContent = productData[i].title

        // Product Price
        const productPrice = document.createElement('div')
        productPrice.setAttribute('class', 'price')
        productPrice.textContent = 'TWD.' + productData[i].price

        container.appendChild(products)
        products.appendChild(product)
        product.appendChild(productImg)
        product.appendChild(productColor)
        product.appendChild(productName)
        product.appendChild(productPrice)
    }

};

/* ==========================================================================
   Week 1 Part 4
   ========================================================================== */
   
   const searchInput = document.getElementById('nav-search');
   const APIsearch = `${API}search?keyword=`;


function searchProduct(src, callback) {
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Search Success!')
            console.log(`You searched up '${searchInput.value}'.`)
            const search = JSON.parse(xhr.responseText);
            console.log(search)
            callback(search);

        } else {
            console.log('The request has failed');
        };
    };
    xhr.open('GET', src, true);
    xhr.send();
}

// Function will check if there is such product then render appropriate output
function searchRender(search) {
    if (search.data.length === 0) {
        // Show "No product available" message
        console.log('Sorry! No such product');

        // Make Existing Products disappear
        container.removeChild(container.firstElementChild);
        
        // No Product Message
        const noProduct = document.createElement('div')
        noProduct.setAttribute('class', 'noProduct')
        noProduct.textContent = 'Error 404 沒有所搜尋的產品哦'
        
        container.appendChild(noProduct)


    } else {
        // Make homepage's Products disappear
        console.log('Here is your product!');
        render(search)
    }
}

// Mobile search text input pop up
function showSearch() {
    // Remove top header
    console.log("i am clicked")
    const topHeader = document.getElementById('top-header')
    
    topHeader.removeChild(topHeader.firstElementChild)
    topHeader.removeChild(topHeader.lastElementChild);

    // Add in text input
    const searchForm = document.createElement('form')
    const searchInput = document.createElement('input')
    searchInput.setAttribute('class', 'nav-mobile-search')
    searchInput.setAttribute('type', 'text')

    const searchSubmit = document.createElement('input')
    searchSubmit.style.display = 'none'

    topHeader.appendChild(searchForm)
    searchForm.appendChild(searchInput)
    searchForm.appendChild(searchSubmit)


}


// Paging & Infinite Scroll
const APIpage = 'https://api.appworks-school.tw/api/1.0/products/all?paging=';

let nextPg;
window.addEventListener('scroll', function () {
    // set event to fire when scrolling reaches end of container
    if (window.innerHeight >= container.getBoundingClientRect().bottom) {
        this.console.log('You have reached the scroll trigger point');
        
    
        // Function to check if there is a next page and produce URL to API
        nextPg = `${APIpage}${haveNext}`
        if (haveNext !== undefined) {
            productLoad(nextPg, renderScroll);
        } else {
            return;
        }
    }
});

// Infinite scroll function to add products from the next page 
function renderScroll(list) {

    const products = document.createElement('div')
    products.setAttribute('class', 'products')

    const productData = list.data;
    for (let i = 0; i < productData.length; i++) {
        // Individual product containter
        const product = document.createElement('div')
        product.setAttribute('class', 'product')

        // Product Main Image
        const productImg = document.createElement('img')
        productImg.src = productData[i].main_image
        
        // Product Color Types
        const productColor = document.createElement('div')
        productColor.setAttribute('class', 'color')
        const colorBox = productData[i].colors
        for (let a = 0; a < colorBox.length; a++) {
            productColor.style.backgroundColor = `#`+colorBox[a].code
        }

        // Product Name
        const productName = document.createElement('div')
        productName.setAttribute('class', 'name')
        productName.textContent = productData[i].title

        // Product Price
        const productPrice = document.createElement('div')
        productPrice.setAttribute('class', 'price')
        productPrice.textContent = 'TWD.' + productData[i].price

        container.appendChild(products)
        products.appendChild(product)
        product.appendChild(productImg)
        product.appendChild(productColor)
        product.appendChild(productName)
        product.appendChild(productPrice)
    }

};
