// src/js/checkout.js
import { getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
//import ProductData from "./ProductData.mjs"; // import ProductData function to handle the form submission

// Retrieve cart data from local storage.
const cartItems = getLocalStorage("so-cart") || []; //if no data, fallback to an empty array

// Initialize the CheckoutProcess class
const checkoutProcess = new CheckoutProcess();

//create an instance of ProductData to handle checkout
//const dataSource = new ProductData("tents");

//use transformed data
const transformedCartItems = cartItems.map((item) => ({
  name: item.Name,
  price: item.FinalPrice,
  quantity: item.quantity,
}));

// Display the order summary when the page loads, i removed "cartItem from function as argument"
checkoutProcess.displayOrderSummary(transformedCartItems);

// Event listener for when the user inputs a zip code
document.querySelector("[name='zip']").addEventListener("input", (event) => {
  const zip = event.target.value;
  if (zip.length === 5) {
    // If the zip code is a valid length, recalculate and display the order summary
    checkoutProcess.displayOrderSummary(transformedCartItems); //also removed "cartItems as argument in the function here"
  }
});
/*
// Event listener for form submission
document.querySelector("#checkoutSubmit").addEventListener("submit", async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Collect customer information from the form
    const customerInfo = {
      name: document.querySelector("[name='fname']").value,
      lname: document.querySelector("[lname='lname']").value,
      address: document.querySelector("[name='street']").value,
      city: document.querySelector("[name='city']").value,
      state: document.querySelector("[name='state']").value,
      zip: document.querySelector("[name='zip']").value
    };
  
    // Create an order object with customer info and transformed cart items
    const order = {
      customer: customerInfo,
      items: transformedCartItems
    };
  
    try {
      // Call the checkout method from ProductData and pass in the order object
      const response = await dataSource.checkout(order);
  
      // Handle the server's response (e.g., display a confirmation message)
      console.log("Order confirmation:", response);
      alert(`Order successfully placed! Order ID: ${response.orderId}`);
  
      // Optionally, clear the cart after successful checkout
      localStorage.removeItem("so-cart");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("There was an issue processing your order. Please try again.");
    }
  }); */
