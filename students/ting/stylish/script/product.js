/* ==========================================================================
   Render Product Page
   ========================================================================== */
    const APIsingleProduct = `${APIproducts}details?id=201807242216`;
    
    callAPI(`${APIsingleProduct}`,renderProduct);


function renderProduct(list) {
    const productData = list.data;

    // image
    const mainIMG = document.querySelector(".main-img")
    mainIMG.src = productData.main_image

    // title
    const title = document.querySelector(".title")
    title.textContent = productData.title
    console.log(productData.title)

    // id
    const id = document.querySelector(".id")
    id.textContent = productData.id

    // price
    const price = document.querySelector(".price")
    price.textContent = `TWD.${productData.price}`

    // colors
    for(let i = 0; i < productData.colors.length; i++ ) {
        const colors = document.querySelector(".colors")
        const colorbox = document.createElement('div') 
        colorbox.setAttribute('class', 'colorbox')
        colorbox.style.backgroundColor = `#`+productData.colors[i].code
        colors.appendChild(colorbox)
    }

    //size
    for (let a = 0; a < productData.colors.length; a++ ) {
    const sizes = document.querySelector(".size")
    const size = document.createElement('div')
    size.textContent = productData.sizes[a]
    sizes.appendChild(size)
    } 

    
    




    
    
    



}