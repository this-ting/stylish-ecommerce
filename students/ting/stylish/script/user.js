/* ==========================================================================
   Login & Logout Screen Render Functions
   ========================================================================== */

function showLogout() {
  const userContent = document.querySelector(".user-content")
  userContent.remove();
};

function showLogin(response) {
  console.log(response.first_name)
  console.log(response.picture.data.url)
  console.log(response.name)
  console.log(response.email)

  const userBanner = document.querySelector(".user-banner")
  userBanner.innerText = `HELLO ${response.first_name}!`

  const userContainer = document.querySelector(".user-container")
  const userContent = document.createElement("div");
  userContent.setAttribute('class', 'user-content');
  userContainer.appendChild(userContent)

  // user img
  const userImg = document.createElement("div");
  userImg.setAttribute('class', 'user-img');
  userContent.appendChild(userImg);

  const userImage = document.createElement("img");
  userImage.src = response.picture.data.url;
  userImg.appendChild(userImage);

  // user info
  const userInfo = document.createElement("div");
  userInfo.setAttribute('class', 'user-info');
  userInfo.innerText = `Name: ${response.name} \r\n Email: ${response.email}`
  userContent.appendChild(userInfo);
};

/* ==========================================================================
   Facebook login
   ========================================================================== */

 // This is called with the results from from FB.getLoginStatus().
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    // Object (for not logged in)
    // authResponse: undefined
    // status: "unknown"
    // __proto__: Object

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();

      //  Get user name, email, photo after login
        FB.api(
            '/me',
            'GET',
            {"fields":"id, name, email, picture.type(large),first_name"},
            showLogin(response)
        );

    } else {
      // The person is not logged into your app or we are unable to tell.
      document.querySelector('.user-banner').innerText = 'HELLO THERE!';
      document.getElementById('status').innerText = 'Would you like to login?';
      
      // if have user content => remove
      if (document.querySelector(".user-content") !== null) {
        showLogout();
      };
      
      
    };
  };




  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  /* ==========================================================================
   Initialized Facebook JavaScript SDK
   ========================================================================== */
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '450421272462212',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.3' // The Graph API version to use for the call
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
  };

/* ==========================================================================
   Manual Facebook Login Button
   ========================================================================== */
// // Set up manual login button

 



