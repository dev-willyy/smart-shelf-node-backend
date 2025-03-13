module.exports = {
  env: 'development',
  port: process.env.PORT,
  robotoff: {
    baseURL: 'https://robotoff.openfoodfacts.org/api/v1',
  },
  allowedFoodCategories: ['dairy', 'meat', 'beverages', 'fruit', 'vegetables', 'bakery'],
};
