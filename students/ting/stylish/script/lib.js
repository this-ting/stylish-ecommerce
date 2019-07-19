/* ==========================================================================
   Library of functions
   ========================================================================== */
// Destination of API
const API = `https://api.appworks-school.tw/api/1.0`;
const APIproducts = `${API}/products/`;


// Set up GET function for API
function callAPI(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('success!');
            const list = JSON.parse(xhr.responseText);
            // console.log(list.data[0].id);
            haveNext = list.paging; // for product paging
            callback(list);
        } else {
            // This will run when it's not
            console.log('The request failed!');
        };
    }
    xhr.open('GET', src);
    xhr.send();
};