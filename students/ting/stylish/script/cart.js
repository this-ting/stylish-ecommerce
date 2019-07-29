/* ==========================================================================
   Cart
   ========================================================================== */
/*
1. renderCart() =>
    loop through 'cart' in local storage to render HTML &
    cartCalculate() => calculate total of all 'cart' products
2. removeProduct() => event handler for remove icon
    use index number from bin to delete out 'cart' list array in local storage 
3. resetIndex() => 
    resets cart title qty, total and product subtotal & bin index
4. updateQty() => event handler for qty selector
    change new selected qty & update to 'cart' list array in local storage
*/

/* ==========================================================================
   Remove Product from 'cart' local storage
   ========================================================================== */
function removeProduct(e) {
    e.target.parentElement.remove();
    let index = e.target.getAttribute("index");

    const currentList = JSON.parse(localStorage.getItem("cart")).order.list;
    currentList.splice(index, 1);
    
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
            "list": currentList
        }
    };

    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
    setCartQty(); // updates cart qty icon #
    resetIndex(); // resets index, qty count & total 
};

// set up function to reset index of remove-icon
function resetIndex(index) {
    // update remove icon index
    const bin = document.querySelectorAll(".cart-remove")
    const qty = document.querySelectorAll(".qty");

    for (let i = 0; i < bin.length; i++) {
        bin[i].setAttribute("index", i);
        qty[i].setAttribute("index", i);
    };

    // update cart title qty
    const mobileTitle = document.querySelector(".cart-title");
    const desktopTitle = document.querySelector(".cart-title-desktop-1");

    mobileTitle.innerText = `購物車(${bin.length})`;
    desktopTitle.innerText = `購物車(${bin.length})`;
     
    // update product subtotal price
    let items = JSON.parse(localStorage.cart).order.list;
    let totalSubtotal = 0;

    // index is only defined/present when change selector
    if (index !== undefined) {
        let newQty = parseInt(items[index].qty);
        let price = items[index].price;
        let productSubtotal = newQty * price;
        let subtotal = document.querySelectorAll(".cart-subtotal")

        subtotal[index].innerText = productSubtotal;
    } 

    // update total subtotal price    
    for (let i = 0; i <items.length; i++) {
        totalSubtotal += items[i].qty * items[i].price; 
    }

    const cartSubtotal = document.querySelector(".total-subtotal");
    cartSubtotal.innerText = totalSubtotal;

    const cartTotal = document.querySelector(".total-total");
    cartTotal.innerText = `${totalSubtotal + 60}`;
};

/* ==========================================================================
   Cart => function to render items from 'cart' local storage
   ========================================================================== */
function renderCart() {
    const cart = JSON.parse(localStorage.cart).order.list;

    // Render cart qty for title
    const mobileTitle = document.querySelector(".cart-title");
    const desktopTitle = document.querySelector(".cart-title-desktop-1");

    mobileTitle.innerText = `購物車(${cart.length})`;
    desktopTitle.innerText = `購物車(${cart.length})`;

    // Render all product information from cart
    for (let i = 0; i < cart.length; i++) {
        const cartContainer = document.querySelector(".cart");
        
        // product container
        const product = document.createElement('div');
        product.setAttribute("class", "cart-product");
        cartContainer.appendChild(product);

        // variant
        const variant = document.createElement('div');
        variant.setAttribute("class", "cart-variant");
        product.appendChild(variant);
        
        // image
        const img = document.createElement('img');
        img.setAttribute("class", "cart-img");
        img.src = cart[i].main_image;
        variant.appendChild(img);

        // detail
        const detail = document.createElement('div');
        detail.setAttribute("class", "cart-details");
        detail.innerText =  cart[i].name + '\r\n' +  
                            cart[i].id + '\r\n' + '\r\n' + 
                            '顏色：'+ cart[i].color.name  + '\r\n' +  
                            '尺寸：'+ cart[i].size;
        variant.appendChild(detail);

        // remove icon
        const removeIcon = document.createElement('img');
        removeIcon.setAttribute("class", "cart-remove");
        removeIcon.src = "../images/cart-remove.png";
        removeIcon.setAttribute("index", i);
        removeIcon.addEventListener('click', removeProduct);
        product.appendChild(removeIcon);

        // qty
        const cartQty = document.createElement('div');
        cartQty.setAttribute("class", "cart-qty");
        product.appendChild(cartQty);

        const qtySelect = document.createElement('select');
        qtySelect.setAttribute("name", "qty");
        qtySelect.setAttribute("class", "qty");
        qtySelect.setAttribute("index", i);
        qtySelect.addEventListener('change', updateQty);
        cartQty.appendChild(qtySelect);

        // set up drop downlist with max stock
        let maxStock = cart[i].stock;
        for (let a = 1; a <= maxStock; a++) {
            let qtyOption = document.createElement('option');
            qtyOption.innerText = a;
            qtyOption.setAttribute("value", a);
            qtySelect.appendChild(qtyOption);

            // set up selected qty as the selector default
            if (parseInt(qtyOption.innerText) == cart[i].qty) {
                qtyOption.selected = "selected";
            };
        };

        // price
        const price = document.createElement('div');
        price.setAttribute("class", "cart-price");
        price.innerText = cart[i].price;
        product.appendChild(price);

        // subtotal
        const subtotal = document.createElement('div');
        subtotal.setAttribute("class", "cart-subtotal");
        subtotal.innerText = cart[i].price*cart[i].qty;
        product.appendChild(subtotal);


    };

    // set up function to calculate subtotal 
    function cartCalculate() {
        let subtotal = 0;
        for (let i = 0; i < cart.length; i++) {
            subtotal += cart[i].price*cart[i].qty;
        };
        return subtotal;
    };

    let calculateSubtotal = cartCalculate()
    const cartSubtotal = document.querySelector(".total-subtotal");
    cartSubtotal.innerText = calculateSubtotal;

    const cartShipping = document.querySelector(".total-shipping");
    cartShipping.innerText = 60;

    const cartTotal = document.querySelector(".total-total");
    cartTotal.innerText = `${calculateSubtotal + 60}`;
    
    
};

/* ==========================================================================
   Update Quantity
   ========================================================================== */

    function updateQty(e) {
        const currentList = JSON.parse(localStorage.getItem("cart")).order.list;
        let qty = e.target.childNodes;
        let index = e.target.getAttribute("index");
        let newQty;
        
        // get new selected qty through loop in selector options
        for (let i = 0; i < qty.length; i++) {
            if (qty[i].selected === true) {
                newQty = qty[i].innerHTML;
            }; 
        };

        // let newQty equal to currentList qty, marked by index to know where in local storage array
        currentList[index].qty = newQty;
        
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
                "list": currentList
            }
        };
        // push to local storage 'cart'
        localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
        resetIndex(index); // resets index, qty count & total 
    };

    renderCart();

/* ==========================================================================
   TapPay 
   ========================================================================== */
/* 
1. Set up Tap Pay =>
    TPDirect.setupSDK &&
    TPDirect.card.setup (For more info, read TapPay Documentation)
2. Set up event listener for cart submit button =>
    get prime from Tap Pay &&
    filled out info is saved to local storage &&
    ensure all inputs are filled out to submit form
*/

// Set up of TapPay SDK
TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');

// Set up CSS for TapPay input fields
let fields = {
    number: {
        // css selector
        element: document.getElementById('card-number'),
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: document.getElementById('card-ccv'),
        placeholder: 'ccv'
    }
};

TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements
        'input': {
            'color': 'gray',
        },
        // Styling ccv field
        'input.ccv': {
            'font-size': '1em'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            'font-size': '1em'
        },
        // Styling card-number field
        'input.card-number': {
            'font-size': '1em'
        },
        // style focus state
        ':focus': {
            'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
});

// Set up event handler for cart submit
const cartSubmit = document.querySelector(".submit-buy");

cartSubmit.addEventListener('click', function(e) {
    event.preventDefault(e);

    // Get TapPay Fields  status => if cannot get, will exit function
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
        
    // Check can getPrime => if error, will exit function
    if (tappayStatus.canGetPrime === false) {
        alert('請重新確認支付方式，謝謝！');
        return;
    };

    // throw in customer data into local storage
    const currentList = JSON.parse(localStorage.getItem("cart")).order.list;
    const subtotal = document.querySelector(".total-subtotal").innerText;
    const freight = document.querySelector(".total-shipping").innerText;
    const total = document.querySelector(".total-total").innerText;
    const name = document.querySelector("input#name").value;
    const phone = document.querySelector("input#cell").value; 
    const email = document.querySelector("input#email").value; 
    const address = document.querySelector("input#address").value;
    const time = getTime();

    function getTime() {
        for (let i = 0; i < document.querySelectorAll("input").length; i++ ) {
            if (document.querySelectorAll("input")[i].checked === true) {
                return document.querySelectorAll("input")[i].value;
            };
        };
    };

    // Prompts user to fill out all the information to submit form
    if (name === '') {
        alert('請輸入您的大名哦！');
        return;
    } else if (email === '') {
        alert('請輸入 email 哦！');
        return;
    } else if (phone === '') {
        alert('請輸入電話號碼哦！');
        return;
    } else if (address === '') {
        alert('請輸入地址哦！');
        return;
    } else if (time === undefined) {
        alert('請選擇配送時間哦！');
        return;
    }else {
        // Get prime
        let prime;
        TPDirect.card.getPrime((result) => {
            if (result.status !== 0) {
                alert('get prime error ' + result.msg);
                return;
            }
            prime = result.card.prime;
            
            let cartDetails = {
                "prime": prime, 
                "order": {
                    "shipping": "delivery",
                    "payment": "credit_card",
                    "subtotal": subtotal, 
                    "freight": freight, 
                    "total": total,
                    "recipient": {
                    "name": name,
                    "phone": phone,
                    "email": email, 
                    "address": address,
                    "time": time, 
                    },
                    "list": currentList
                }
            };
            console.log(cartDetails, prime)
            localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);

        });
       





    };







});


// Set up POST for cart checkout
function checkoutCart(src, callback) {
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
    xhr.open('POST', src);
    xhr.send();
};




















