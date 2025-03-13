const axios = require('axios');

const OFF_URL = 'https://world.openfoodfacts.org/api/v0/product';

async function fetchProductInfo(barcode) {
  try {
    const response = await axios.get(`${OFF_URL}/${barcode}.json`);
    if (response.data && response.data.status === 1) {
      const product = response.data.product;
      // Extract primary category (using categories_hierarchy if available)
      let category = 'unknown';
      if (product.categories_hierarchy && product.categories_hierarchy.length) {
        // Choose the last category in hierarchy (most specific)
        category = product.categories_hierarchy[product.categories_hierarchy.length - 1].replace(/^en:/, '');
      }
      return {
        barcode: product.code,
        name: product.product_name || 'Unknown Product',
        category,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product info:', error.message);
    return null;
  }
}

module.exports = { fetchProductInfo };
