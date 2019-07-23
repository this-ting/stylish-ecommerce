/* ==========================================================================
   Render Home Page & Category Page
   ========================================================================== */
// Variables
const APIsearch = `${APIproducts}search?keyword=`;
const APImarketing = `${API}/marketing/campaigns`;
const APIasset = `https://api.appworks-school.tw`;
let category = 'all';

// Set up products render function
const container = document.getElementById('main-content');

function render(list) {
    // Make homepage's Products disappear
    container.removeChild(container.firstElementChild);

    const products = document.createElement('div');
    products.setAttribute('class', 'products');
    container.appendChild(products);

    const productData = list.data;
    for (let i = 0; i < productData.length; i++) {
        // Individual product containter
        const product = document.createElement('a');
        product.setAttribute('class', 'product');
        product.setAttribute('href', `product.html?id=${productData[i].id}`);
        products.appendChild(product);

        // Product Main Image
        const productImg = document.createElement('img');
        productImg.src = productData[i].main_image;
        product.appendChild(productImg);
        
        // Product Color Types
        const colorBox = productData[i].colors;
        for (let a = 0; a < colorBox.length; a++) {
            const productColor = document.createElement('div');
            productColor.setAttribute('class', 'color');
            productColor.style.backgroundColor = `#`+colorBox[a].code;
            product.appendChild(productColor);
        };
        // Product Name
        const productName = document.createElement('div');
        productName.setAttribute('class', 'name');
        productName.textContent = productData[i].title;
        product.appendChild(productName);

        // Product Price
        const productPrice = document.createElement('div');
        productPrice.setAttribute('class', 'price');
        productPrice.textContent = 'TWD.' + productData[i].price;
        product.appendChild(productPrice);

    };
};

let nextPg; // for product paging
let haveNext; // for product paging

function getProductList(category){
    callAPI(`${APIproducts}${category}`, function(list){
        haveNext=list.paging;
        render(list);
    });
}

// Render homepage products on load
if ( window.location.search === '?tag=women') {
    getProductList("women");

} else if ( window.location.search === '?tag=men') {
    getProductList("men");

} else if ( window.location.search === "?tag=accessories") {
    getProductList("accessories");

} else {
    getProductList("all");
};

/* ==========================================================================
   Search Function
   ========================================================================== */
const searchInput = document.getElementById('nav-search');

function searchProduct(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Search Success!');
            let search = JSON.parse(xhr.responseText);
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
    if (search.error ==  "Wrong Request") {
        // Make Existing Products disappear
        container.removeChild(container.firstElementChild);
    
        // No Product Message
        const noProduct = document.createElement('div');
        noProduct.setAttribute('class', 'noProduct');
        noProduct.textContent = '請輸入搜尋的產品哦';
        
        container.appendChild(noProduct);

    } else if (search.data.length === 0) {
        // Show "No product available" message
        console.log('Sorry! No such product');

        // Make Existing Products disappear
        container.removeChild(container.firstElementChild);
        
        // No Product Message
        const noProduct = document.createElement('div');
        noProduct.setAttribute('class', 'noProduct');
        noProduct.textContent = 'Error 404 沒有所搜尋的產品哦';
        
        container.appendChild(noProduct);

    } else {
        // Make homepage's Products disappear
        render(search);
    }
    // remove event listener
    window.removeEventListener('scroll', infiniteScroll);
}

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

    document.querySelector("form").addEventListener('submit', (e) => {
        e.preventDefault();
        searchProduct(`${APIsearch}${searchInputMobile.value}`,searchRender);
    });

}

/* ==========================================================================
   Paging & Infinite Scroll
   ========================================================================== */
// Paging & Infinite Scroll
let pageLoading=false; // to prevent renderScroll from running multiple times when scroll event triggered

const infiniteScroll = function () {
    // set event to fire when scrolling reaches end of container
    if (window.innerHeight > container.getBoundingClientRect().bottom) {
        // Function to check if there is a next page and produce URL to API
        let APIpage = `${APIproducts}${category}?paging=`;
        nextPg = `${APIpage}${haveNext}`;
        if (haveNext !== undefined && pageLoading === false) {
            pageLoading = true;
            callAPI(nextPg, renderScroll);
        } else {
            return;
        };
    };
}

window.addEventListener('scroll', infiniteScroll);

// Infinite scroll function to add products from the next page 
function renderScroll(list) {

    const products = document.querySelector(".products");
    let productData = list.data;
    for (let i = 0; i < productData.length; i++) {
        // Individual product containter
        const product = document.createElement('a');
        product.setAttribute('class', 'product');
        product.setAttribute('href', `product.html?id=${productData[i].id}`);
        products.appendChild(product);

        // Product Main Image
        const productImg = document.createElement('img');
        productImg.src = productData[i].main_image;
        product.appendChild(productImg);
        
        // Product Color Types
        const colorBox = productData[i].colors;
        for (let a = 0; a < colorBox.length; a++) {
            const productColor = document.createElement('div');
            productColor.setAttribute('class', 'color');
            productColor.style.backgroundColor = `#`+colorBox[a].code;
            product.appendChild(productColor);
        }
        // Product Name
        const productName = document.createElement('div');
        productName.setAttribute('class', 'name');
        productName.textContent = productData[i].title;
        product.appendChild(productName);

        // Product Price
        const productPrice = document.createElement('div');
        productPrice.setAttribute('class', 'price');
        productPrice.textContent = 'TWD.' + productData[i].price;
        product.appendChild(productPrice);
    }
    haveNext += 1; // increase paging for next scroll
    pageLoading = false; // to prevent renderScroll from running multiple times when scroll event triggered
};
/* ==========================================================================
   Marketing Campaigns
   ========================================================================== */
const marketingContainer = document.getElementById('marketing-container');

function renderMarketing(list) {
    // set up for each function to create 3 marketing banners
    let productData = list.data;
   
    for (let i = 0; i < productData.length; i++) {
        // Marketing Background Image
        const marketingImg = document.createElement('div');
        marketingImg.setAttribute('class', 'main-banner fade');
        marketingImg.style.backgroundImage = `url(${APIasset}${productData[i].picture})`;
        
        // Marketing Background Text
        const marketingText = document.createElement('div');
        marketingText.setAttribute('class', 'banner-text');
        marketingText.innerText = productData[i].story;

        marketingContainer.appendChild(marketingImg);
        marketingImg.appendChild(marketingText);
    }    
    showSlides();
}

// Render marketing campaign banner
callAPI(`${APImarketing}`,renderMarketing);

// Slideshow function
let slideIndex = 0;
function showSlides() {
    const slides = document.getElementsByClassName("main-banner");
    const dots = document.getElementsByClassName("dot");
    // resets all dots and banner to none
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}; // infinite loop
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Renders Banner on click
function oneShow(n) {
    const slides = document.getElementsByClassName("main-banner");
    const dots = document.getElementsByClassName("dot");
    //  resets all banner display to none
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n].style.display = 'block';
}
