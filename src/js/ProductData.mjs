function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`; //removed the '..' ,Update the Path to JSON Files: Change the path to reference the json folder as an absolute path. 
    //this.checkoutUrl = `https://sleepoutside1.netlify.app/checkout`; //added this production server url
  }

  //Fetch data from the local JSON file based on category
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
/*
  // Method to send the order object to the server via POST request
  async checkout(order) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order) // Convert order object to JSON string
    };
      
    try {
      // Use fetch to send the order to the server and wait for the response
      const response = await fetch(this.checkoutUrl, options);

      // Parse and return the JSON response from the server
      return await response.json();
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  }
*/
