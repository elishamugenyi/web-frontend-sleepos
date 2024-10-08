// src/js/CheckoutProcess.mjs

export default class CheckoutProcess {
    constructor() {
      this.taxRate = 0.06; // 6% sales tax
      this.shippingBaseCost = 10; // Base shipping cost for the first item
      this.shippingAdditionalItemCost = 2; // Additional cost for each item after the first
    }
  
    // Calculate and display the item subtotal
    calculateItemSubtotal(cartItems) {
      let subtotal = 0;
      cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
      });
      return subtotal.toFixed(2);
    }
  
    // Calculate the shipping cost based on the number of items in the cart
    calculateShipping(cartItems) {
      if (cartItems.length === 0) return 0;
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const shippingCost = this.shippingBaseCost + (itemCount - 1) * this.shippingAdditionalItemCost;
      return shippingCost.toFixed(2);
    }
  
    // Calculate tax based on the item subtotal
    calculateTax(subtotal) {
      const taxAmount = subtotal * this.taxRate;
      return taxAmount.toFixed(2);
    }
  
    // Calculate the order total
    calculateOrderTotal(subtotal, shipping, tax) {
      const total = parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax);
      return total.toFixed(2);
    }
  
    // Display the order summary on the page
    displayOrderSummary(cartItems) {
      // Calculate each part of the summary
      const subtotal = this.calculateItemSubtotal(cartItems);
      const shipping = this.calculateShipping(cartItems);
      const tax = this.calculateTax(subtotal);
      const orderTotal = this.calculateOrderTotal(subtotal, shipping, tax);
  
      // Update the HTML elements with the calculated values
      document.getElementById('cartTotal').textContent = `$${subtotal}`;
      document.getElementById('shipping').textContent = `$${shipping}`;
      document.getElementById('tax').textContent = `$${tax}`;
      document.getElementById('orderTotal').textContent = `$${orderTotal}`;
  
      // Display the number of items in the cart
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      document.getElementById('num-items').textContent = `${itemCount} items`;
    }
  }