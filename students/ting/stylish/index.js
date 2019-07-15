/* ==========================================================================
   Week 1 Part 3
   ========================================================================== */
// Destination of API
const API = 'https://api.appworks-school.tw/api/1.0'

// Set up GET function
function productLoad(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('success!');
            const list = JSON.parse(xhr.responseText);
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
