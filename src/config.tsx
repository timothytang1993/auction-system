function GoogleClientId() {
  return "432145444003-cv2dt8okciqn3gjcuo8dl5bh0ogk4gt3.apps.googleusercontent.com";
}

function BackEndUrl() {
  return "http://localhost:8888";
}

function BidAPIUrl() {
  return BackEndUrl() + "/api/product/bid";
}

function ProductsAPIUrl() {
  return BackEndUrl() + "/api/product/list";
}

function WebSocketUrl() {
  return BackEndUrl() + "/api/web-socket";
}

function ProductWebSocketUrn() {
  return "/product-last-price";
}

export {
  GoogleClientId,
  BackEndUrl,
  BidAPIUrl,
  ProductsAPIUrl,
  WebSocketUrl,
  ProductWebSocketUrn,
};
