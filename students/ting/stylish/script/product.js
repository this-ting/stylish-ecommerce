/* ==========================================================================
   Render Product Page
   ========================================================================== */
const APIsingleProduct = `${APIproducts}details`;

callAPI(`${APIsingleProduct}${window.location.search}`,renderProduct);

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

    // size
    let APIsize = productData.sizes;
    APIsize.forEach(function(APIsize) {
        const sizes = document.querySelector(".size")
        const size = document.createElement('div')
        size.textContent = APIsize
        sizes.appendChild(size)
    })
    
    // specs
    const specs = document.querySelector(".specs")
    specs.innerText = productData.note + '\r\n' + '\r\n' + 
                      productData.texture + '\r\n'+ 
                      productData.description + '\r\n' + '\r\n' + 
                      '清洗：' +productData.wash + '\r\n' +
                      '產地：' +productData.place 

    // story
    const story = document.querySelector(".story")
    story.textContent = productData.story

    // images
    const APIimg = productData.images
    APIimg.forEach(function(APIimg){
        const descriptionContainer = document.querySelector(".description-container")
        const img = document.createElement('img')
        img.setAttribute('class', 'image')
        img.src = APIimg
        descriptionContainer.appendChild(img)
    });
    quantityBar(); // call quantityBar functions
}

/* ==========================================================================
   Quantity Bar
   ========================================================================== */
function quantityBar(){
    const qtyBox = document.querySelector(".qty-box");
    const minus = document.querySelector(".qty-minus");
    const plus = document.querySelector(".qty-plus");

    plus.addEventListener("click", function(){
        let number = document.querySelector(".qty-no").innerText;
        number = parseInt(number) + 1;
        document.querySelector(".qty-no").textContent = number
    })

    minus.addEventListener("click", function(){
        let number = document.querySelector(".qty-no").innerText;
        if (number > 1 ) {
        number = parseInt(number) - 1;
        document.querySelector(".qty-no").textContent = number 
        } 
    })

    const selectSize = document.querySelector(".selectSize")
    const selectColor = document.querySelector(".SelectColor")

    const size = document.querySelector(".size div")
    const color = document.querySelectorAll(".colorbox")

    for (let i = 0; i < color.length ; i++) {
        color[i].addEventListener("click", function() {
            console.log("selected a color")
        
        })
    }


}

