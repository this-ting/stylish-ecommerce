/* ==========================================================================
   Thank You
   ========================================================================== */
// Get order number from location.search query string
const orderNo = location.search
  .substring(location.search.indexOf("?") + 1)
  .split("&")[0]
  .split("=")[1];

const orderConfirm = document.querySelector(".order");
orderConfirm.innerText = `您的訂單編號為 ${orderNo}`;
