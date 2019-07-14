
// Setting up Product page to pull product info from API
const container = document.getElementById('main-content')

const xhr = new XMLHttpRequest();
xhr.onload = function () {
    const list = JSON.parse(xhr.responseText).data;
    console.log(list);
    if (xhr.status >= 200 && xhr.status < 300) {
        // This will run when the request is successful
        console.log('success!', xhr);

        for (let i = 0; i < list.length; i++) {
            const product = document.createElement('div')
            product.setAttribute('class', 'product')

            const productImg = document.createElement('img')
            productImg.src = list[i].main_image
            
            // const productColor = document.createElement('div')
            // list[i].colors[i]

            const productName = document.createElement('div')
            productName.textContent = list[i].title

            const productPrice = document.createElement('div')
            productPrice.textContent = 'TWD.' + list[i].price

            container.appendChild(product)
            product.appendChild(productImg)
            product.appendChild(productName)
            product.appendChild(productPrice)

        }

    } else {
		// This will run when it's not
		console.log('The request failed!');
	}
};
xhr.open('GET', 'https://api.appworks-school.tw/api/1.0/products/all', true);
xhr.send();
