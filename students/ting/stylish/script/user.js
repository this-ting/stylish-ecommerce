/* ==========================================================================
   Facebook login
   ========================================================================== */
/* 
1. Initialize Facebook JavaScript SDK
2. Once initialized, will run checkLoginState() =>
   if login => render user info & signin POST request
   if logout => render login screen & remove tokens from local storage
*/

// Set up function to check status of login status
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

// Set up function to render user.html accoring to login status from function checkLoginState()
function statusChangeCallback(response) {
  // console.log('statusChangeCallback');
  // console.log(response);

  // if Facebook login is sucessful
  if (response.status === 'connected') {
    testAPI();
    
    // Set Facebook token to local storage
    localStorage.setItem("fbToken", response.authResponse.accessToken);

    // POST request Organize user info into an object
    let user = {
      "provider":"facebook",
      "access_token": localStorage.fbToken
    };
    let userInfo = JSON.stringify(user);
    const APIlogin = 'https://api.appworks-school.tw/api/1.0/user/signin';

    getServerToken(APIlogin, userInfo, serverLoginInfo); // Login POST Request

    // Check if user content is already loaded, if not => load
    const userContent = document.querySelector(".user-content")
    if (userContent === null) {
      FB.api(
        '/me',
        'GET',
        { "fields": "id, name, email, picture.type(large),first_name" },
        function (response) {
          const userBanner = document.querySelector(".user-banner");
          userBanner.innerText = `HELLO ${response.first_name.toUpperCase()}!`;

          const userContainer = document.querySelector(".user-container");
          const userContent = document.createElement("div");
          userContent.setAttribute('class', 'user-content');
          userContainer.appendChild(userContent);

          // user img
          const userImg = document.createElement("div");
          userImg.setAttribute('class', 'user-img');
          userContent.appendChild(userImg);

          const userImage = document.createElement("img");
          userImage.src = response.picture.data.url;
          userImage.alt = "User profile picture";
          userImg.appendChild(userImage);

          if (response.email !== undefined) {
            const userInfo = document.createElement("div");
            userInfo.setAttribute('class', 'user-info');
            userInfo.innerText = `Name: ${response.name} \r\n Email: ${response.email}`;
            userContent.appendChild(userInfo);
          } else {
            const userInfo = document.createElement("div");
            userInfo.setAttribute('class', 'user-info');
            userInfo.innerText = `Name: ${response.name} \r\n 
                                  Email: N/A \r\n 
                                  Note: To show email, you may click accept permission on the next login prompt.`;
            userContent.appendChild(userInfo);
          };
        }
      );
    };

  } else {
    // The person is not logged into your app or we are unable to tell.
    document.querySelector('.user-banner').innerText = 'HELLO THERE!';
    document.getElementById('status').innerText = 'Would you like to login?';

    // if have user content => remove
    const userContent = document.querySelector(".user-content")
    if (userContent !== null) {
      userContent.remove();
    };

    // Remove fbToken from local storage when log out
    localStorage.removeItem("fbToken");
    localStorage.removeItem("access_token");
  };
}; 

/* ==========================================================================
 Initialize Facebook JavaScript SDK
 ========================================================================== */
window.fbAsyncInit = function () {
  FB.init({
    appId: '450421272462212',
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.3' // The Graph API version to use for the call
  });
  // callback function after initialization
  checkLoginState();
};

// Load the SDK asynchronously
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Set up function to test getting info from API
function testAPI() {
  // console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function (response) {
    // console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
};

/* ==========================================================================
   POST Request to get server access token
   ========================================================================== */
/*
1. Provide Facebook access token in exchange for Stylish's servers access token
*/

// Set up POST for user server access token
function getServerToken(src, info, callback) {
  const xhr = new XMLHttpRequest();
          xhr.open('POST', src);
          xhr.setRequestHeader('Content-type','application/json');           
          xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                  // This will run when the request is successful
                  console.log('API POST for server token success!');
                  const list = JSON.parse(xhr.responseText);
                  callback(list);
              } else {
                  // This will run when it's not
                  console.log('The request failed!');
              };
          };
          xhr.send(info);
};

// Callback function for POST requeest for server access token
function serverLoginInfo(list) {
  const serverToken = list.data.access_token;
  localStorage.setItem("access_token", serverToken);
};
