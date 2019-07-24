/* ==========================================================================
   Cart
   ========================================================================== */

function renderCart() {
    const cart = JSON.parse(localStorage.cart).order.list;
    console.log('cart rendering');

    // Render all product information from cart
    const mobileTitle = document.querySelector(".cart-title").innerHTML;
    const desktopTitle = document.querySelector(".cart-title-desktop-1").innerHTML;
    

    // const product = document.createElement(".cart-product");
    // const img = document.querySelector(".cart-img").src;
    // const details = document.querySelector(".cart-details").innerHTML;
    // const qty = document.querySelector(".cart-qty select");
    // const price = document.querySelector(".cart-price").innerHTML;
    // const subtotal = document.querySelector(".cart-subtotal").innerHTML;
    
    
    const details = document.createElement('div');
    const qty = document.createElement('select');
    const price = document.querySelector(".cart-price").innerHTML;
    const subtotal = document.querySelector(".cart-subtotal").innerHTML;


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

        // qty

        // price


        // subtotal




    }










}

renderCart();