import { setLocalStorage, getLocalStorage } from "./utils.mjs"; //imported getLocalStorage Sun 6/Oct
import ProductData from "./ProductData.mjs";
//import { addToCart } from "./cart.js"; //import addToCart function from cart.js- Sun 6/Oct

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieve the current cart items from local storage
  let cartItems = getLocalStorage("so-cart") || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cartItems.findIndex(
    (item) => item.Id === product.Id,
  );

  if (existingProductIndex >= 0) {
    // If the product exists, increment its quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // If the product doesn't exist, add it with an initial quantity of 1
    product.quantity = 1;
    cartItems.push(product);
  }

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", cartItems);
}
async function addToCartHandler(e) {
  // Prevent the default action of the event
  e.preventDefault();

  // Fetch the product details based on the ID from the dataset
  const productId = e.target.dataset.id;
  const product = await dataSource.findProductById(productId);

  // Call the function to add the product to the cart
  addProductToCart(product);

  // Optionally, you can call renderCartContents here if you want to re-render the cart instantly
}

// Add event listener to the "Add to Cart" button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// If you have multiple "Add to Cart" buttons dynamically rendered, you can use querySelectorAll instead
document.querySelectorAll(".add-to-cart-button").forEach((button) => {
  button.addEventListener("click", addToCartHandler);
});

/*
//commented this out as original code to check this new code- Sun 6/Oct
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
*/
