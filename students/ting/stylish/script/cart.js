/* ==========================================================================
   Cart
   ========================================================================== */

function renderCart() {
    const cart = JSON.parse(localStorage.cart).order.list;
    console.log('cart rendering');

    // Render all product information from cart
    const mobileTitle = document.querySelector(".cart-title").innerHTML;
    const desktopTitle = document.querySelector(".cart-title-desktop-1").innerHTML;
    
    // for loop to go through cart list items, to render product
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
        img.src = cart[i].main_image
        variant.appendChild(img);

        // detail
        const detail = document.createElement('div');
        detail.setAttribute("class", "cart-details");
        detail.innerHTML = `${cart[i].name}
                            ${cart[i].id}
                            顏色：${cart[i].color.name} 
                            尺寸：${cart[i].size}`
        variant.appendChild(detail);

        // remove icon
        const remove = document.createElement('img');
        remove.setAttribute("class", "cart-remove");
        remove.src = "../images/cart-remove.png"
        product.appendChild(remove);

        // qty
        const cartQty = document.createElement('div');
        cartQty.setAttribute("class", "cart-qty");
        product.appendChild(cartQty);

        const qtySelect = document.createElement('select');
        cartQty.setAttribute("class", "qty");
        cartQty.appendChild(qtySelect);

        // NEED TO MAKE FOR LOOK FOR MAX QTY OPTION !!!!!
        const qtyOption = document.createElement('option');

        // price
        const price = document.createElement('div');
        price.setAttribute("class", "cart-price");
        price.innerHTML = `TWD. ${cart[i].price}`
        product.appendChild(price);

        // subtotal
        const subtotal = document.createElement('div');
        subtotal.setAttribute("class", "cart-subtotal");
        subtotal.innerHTML = `TWD. ${cart[i].price*cart[i].qty}`
        product.appendChild(subtotal);




    }










}

renderCart();