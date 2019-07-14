
// Setting up Product page to pull product info (female) from API
const container = document.getElementById('main-content-female')

const xhr = new XMLHttpRequest();
xhr.onload = function () {
    const list = JSON.parse(xhr.responseText).data;

    if (xhr.status >= 200 && xhr.status < 300) {
        // This will run when the request is successful
        console.log('success!');
        
        for (let i = 0; i < list.length; i++) {
            if (list[i].category === 'women') {
                // Individual product containter
                const product = document.createElement('div')
                product.setAttribute('class', 'product')

                // Product Main Image
                const productImg = document.createElement('img')
                productImg.src = list[i].main_image
                
                // Product Color Types
                const productColor = document.createElement('div')
                productColor.setAttribute('class', 'color')
                const colorBox = list[i].colors
                for (let a = 0; a < colorBox.length; a++) {
                    productColor.style.backgroundColor = `#`+colorBox[a].code
                    console.log(colorBox[a].code)
                }

                // Product Name
                const productName = document.createElement('div')
                productName.setAttribute('class', 'name')
                productName.textContent = list[i].title

                // Product Price
                const productPrice = document.createElement('div')
                productPrice.setAttribute('class', 'price')
                productPrice.textContent = 'TWD.' + list[i].price

                container.appendChild(product)
                product.appendChild(productImg)
                product.appendChild(productColor)
                product.appendChild(productName)
                product.appendChild(productPrice)
            }

        }

    } else {
		// This will run when it's not
		console.log('The request failed!');
	}
};
xhr.open('GET', 'https://api.appworks-school.tw/api/1.0/products/all', true);
xhr.send();
