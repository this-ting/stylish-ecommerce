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
        colorbox.setAttribute('hex', `${productData.colors[i].code}`) // creates easy tag to grab color
        colorbox.style.backgroundColor = `#`+productData.colors[i].code
        colors.appendChild(colorbox)
    }

    // size
    let APIsize = productData.sizes;
    APIsize.forEach(function(APIsize) {
        const sizes = document.querySelector(".size")
        const size = document.createElement('div')
        size.setAttribute('class', 'size-circle')
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
    quantityBar(list); // call quantityBar functions

}

/* ==========================================================================
   Quantity Bar
   ========================================================================== */
function quantityBar(list){
    
    // set up event handler for color
    const color = document.querySelectorAll(".colorbox")
    for (let i = 0; i < color.length ; i++) {
    
        color[i].addEventListener("click", function() {
            // resets all class name to default (unselected)
            for (let i = 0; i < color.length ; i++) {
                color[i].className = color[i].className.replace(" selectColor", "");
            }
            color[i].className += " selectColor";
            console.log(document.querySelector(".selectColor").getAttribute("hex"))
            document.querySelector(".qty-no").textContent = 1; // resets qty to 1 whenever new select

            // When there is no stock, will change opacity & class name
            let noStock = zeroStock();
            console.log(`${noStock} has no stock`);
            const size = document.querySelectorAll(".size-circle")
            for (let t = 0; t < size.length; t++) {
                size[t].style.opacity = 1; // resets opacity when clicked
                size[t].className = size[t].className.replace(" disableSize", "");
                if (size[t].innerHTML === noStock) {
                    size[t].style.opacity = 0.2;
                    size[i].className += " disableSize";
                } 
            }
        });
    }

    // set up event handler for size
    const size = document.querySelectorAll(".size-circle")
    for (let i = 0; i < size.length ; i++) {
            size[i].addEventListener("click", function() {
                // disables click function if labeled no stock
                if (size[i].className === "size-circle disableSize") {
                    return
                } else {
                    // resets all class name to default (unselected)
                    for (let i = 0; i < size.length ; i++) {
                        size[i].className = size[i].className.replace(" selectSize", "")
                    }
                    size[i].className += " selectSize";
                }
                console.log(document.querySelector(".selectSize").innerHTML)
                document.querySelector(".qty-no").textContent = 1 // resets qty to 1 whenever new select
            })
    }

    // set up event handler for plus on quantity bar
    const plus = document.querySelector(".qty-plus");
    plus.addEventListener("click", function(){
        
        // When color and size are selected, run getStock funtion
        if (document.querySelector(".selectColor") !== null && document.querySelector(".selectSize") !== null) {
            let number = document.querySelector(".qty-no").innerText;
            let stock = getStock();
            console.log(stock)

            if (number < stock ) {
                number = parseInt(number) + 1;
                document.querySelector(".qty-no").textContent = number
            } else {
                return
            };

        } else {
            return
        };
 
    })

    // set up event handler for minus on quantity bar
    const minus = document.querySelector(".qty-minus");
    minus.addEventListener("click", function(){
        let number = document.querySelector(".qty-no").innerText;
        if (number > 1 ) {
        number = parseInt(number) - 1;
        document.querySelector(".qty-no").textContent = number 
        } 
    })

    // set up function to get stock number
    const stockData = list.data.variants; 
    function getStock() {
        for (let c = 0; c < stockData.length; c++) {
            let selectColor = document.querySelector(".selectColor").getAttribute("hex")
            let selectSize = document.querySelector(".selectSize").innerHTML
            if (selectColor === stockData[c].color_code && selectSize === stockData[c].size) {
                // console.log(`The stock is ${stockData[c].stock}`)
                return stockData[c].stock;
            }
        };
    }

    // set up function to check for zeroStock for a color
    function zeroStock() {
        for (let c = 0; c < stockData.length; c++) {
            let selectColor = document.querySelector(".selectColor").getAttribute("hex")

            if (selectColor === stockData[c].color_code && 0 === stockData[c].stock) {
                // console.log(`${stockData[c].size} has no stock`)x
                return stockData[c].size;
            }
        };
    }

    
}