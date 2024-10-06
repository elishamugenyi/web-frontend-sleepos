// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Calculate total price of items in cart. Added Sun 06/Oct
export function calculateTotal(items) {
  // Check the type and value of FinalPrice and quantity
  items.forEach((item) => {
    //console.log(`Item: ${item.Name}, FinalPrice: ${item.FinalPrice} (${typeof item.FinalPrice}), Quantity: ${item.quantity} (${typeof item.quantity})`);
  });

  return items.reduce((total, item) => {
    // Ensure FinalPrice is a number before adding it
    const price = parseFloat(item.FinalPrice) || 0; // Fallback to 0 if parseFloat fails
    const quantity = item.quantity || 1; //fall back to default quantity 1 if undefined
    return total + price * quantity;
  }, 0).toFixed(2);
  //return items.reduce((total, item) => total + item.FinalPrice * item.quantity, 0).toFixed(2);
}