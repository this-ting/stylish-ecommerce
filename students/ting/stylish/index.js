// const express = require('express');
// const port = 3000;
// const app = express();

// // Setting up server at 3000
// app.listen(port, function () {
//     console.log("Server is running on "+ port +" port");
//   });

// app.get('/', function (req, res) {
//     res.render(`index.html`)
// })

// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// // Create request for Marketing Campaigns API
// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://api.appworks-school.tw/api/1.0/marketing/campaigns', true )

// xhr.onload = function () {
//     console.log("can GET Marketing Campaigns API");
//     console.log(this.responseText);
    
//     const data = JSON.parse(this.responseText)
//     console.log(data.data[0].picture)

//     // if (request.status >= 200 && request.status <400) {
//     //     console.log(data.data[0].picture)
//     // } else {
//     //     console.log('WE HAVE AN ERRRRRROR')
//     // }
    
// }

// xhr.send()