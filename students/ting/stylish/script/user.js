/* ==========================================================================
   Facebook login
   ========================================================================== */
/* 
1. Initialize Facebook JavaScript SDK
2. Once initialized, will run checkLoginState() =>
  will render screen according to login status
*/

// Set up function to check status of login status
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

// Set up function to render user.html accoring to login status from function checkLoginState()
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();

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
  };
}; // end of function statusChangeCallback(response)



window.fbAsyncInit = function () {
  FB.init({
    appId: '450421272462212',
    cookie: true,  // enable cookies to allow the server to access 
    // the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.3' // The Graph API version to use for the call
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

  checkLoginState();
};