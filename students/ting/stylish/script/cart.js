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
}

// set up function to reset index of remove-icon
function resetIndex(index) {
    // update remove icon index
    const bin = document.querySelectorAll(".cart-remove")

    for (let i = 0; i < bin.length; i++) {
        bin[i].setAttribute("index", i);
    };

    // update cart title qty
    const mobileTitle = document.querySelector(".cart-title");
    const desktopTitle = document.querySelector(".cart-title-desktop-1");

    mobileTitle.innerText = `購物車(${bin.length})`;
    desktopTitle.innerText = `購物車(${bin.length})`;

    // update product subtotal price
    let items = JSON.parse(localStorage.cart).order.list;
    let newQty = parseInt(items[index].qty);
    let price = items[index].price;
    let productSubtotal = newQty * price;
    let subtotal = document.querySelectorAll(".cart-subtotal")
    subtotal[index].innerText = `TWD. ${productSubtotal}`;

    // update total subtotal price
    let totalSubtotal = 0;
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
    console.log('cart rendering');

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
        price.innerText = `TWD. ${cart[i].price}`;
        product.appendChild(price);

        // subtotal
        const subtotal = document.createElement('div');
        subtotal.setAttribute("class", "cart-subtotal");
        subtotal.innerText = `TWD. ${cart[i].price*cart[i].qty}`;
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
        
        // get new selected qty
        for (let i = 0; i < qty.length; i++) {
            if (qty[i].selected === true) {
                newQty = qty[i].innerHTML;
            }; 
        };

        // let newQty equal to currentList qty
        for (let a = 0; a < currentList.length ; a++) {
            currentList[a].qty = newQty;
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
                "list": currentList
            }
        };
        // push to local storage 'cart'
        localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
        resetIndex(index); // resets index, qty count & total 
    };

renderCart();

