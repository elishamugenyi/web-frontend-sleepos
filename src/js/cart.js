import { getLocalStorage, setLocalStorage, calculateTotal } from "./utils.mjs"; //imported setlocalstorage and calculatetotal functions.

//button for checkout to redirect to checkout page
const button1 = document.getElementById("checkout-btn");
button1.addEventListener("click", () => {
  window.location.href = "../checkout/index.html";
});

//render cart contents. Added today Sun 6/Oct
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; //added an empty array to compare
  const htmlItems = cartItems.map((item) => cartItemTemplate(item)).join(""); //added .join("")
  document.querySelector(".product-list").innerHTML = htmlItems; //removed .join("")

  //update cart counter and total amount. Added Sun 6/0ct
  updateCartCounter(cartItems.length);
  updateTotalAmount(calculateTotal(cartItems));
}

//Template for single cart item- Sun 6/Oct

function cartItemTemplate(item) {
  //set default quantity if undefined
  const quantity = item.quantity || 1;
  //log item details for debugging
  //console.log(`Rendering item: ${item.Name}, FinalPrice: ${item.FinalPrice}`);

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

// Update cart counter.
function updateCartCounter(count) {
  document.querySelector(".cart-count").textContent = count;
}

// Update total amount.
function updateTotalAmount(amount) {
  //console.log(`Total Amount: ${amount}`);//check the value of amount
  document.querySelector(".cart-total").textContent = `$${amount}`;
}

// Function to add item to cart.
export function addToCart(item) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Check if the item already exists in the cart.
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.Id === item.Id,
  );

  if (existingItemIndex >= 0) {
    // If item already exists, update its quantity.
    cartItems[existingItemIndex].quantity =
      cartItems[existingItemIndex].quantity || 1;
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // If item doesn't exist, add it to the cart.
    item.quantity = 1; // Initialize quantity if not already set.
    item.FinalPrice = parseFloat(item.FinalPrice); //convert FinalPrice to number
    cartItems.push(item);
  }

  // Save the updated cart to localStorage.
  setLocalStorage("so-cart", cartItems);

  // Re-render cart contents.
  renderCartContents();
}

//initial render of the cart
renderCartContents();

/*
//commented this function out, it was here first.
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}*/

//renderCartContents(); was here

/*
document.addEventListener('DOMContentLoaded', function() {
  // Select all product cards
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    card.addEventListener('click', function(event) {
      // Prevent default link behavior
      event.preventDefault();

      // Capture product details (e.g., name, price)
      const productName = card.querySelector('.card__name').innerText;
      const productPrice = card.querySelector('.product-card__price').innerText;

      // Add to cart logic (to be implemented)
      addToCart(productName, productPrice);
    });
  });
});

// Example addToCart function to update cart data
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item is already in cart, and update quantity if needed
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(`Added ${name} to the cart.`);
}
*/
