const { fetchProductInfo } = require('../services/openFoodFactsService');
const { computeSpoilage } = require('../services/advancedMlService');
const config = require('config');

/**
 * Predict the Expiry/Spoilage duration of a Food product
 */
async function predictExpiry(req, res, next) {
  const { barcode, temperature, humidity } = req.body;

  try {
    if (!barcode || !temperature || !humidity) {
      return res.status(400).json({
        error: 'Missing barcode, temperature, or humidity.',
      });
    }

    // Fetch product info from OFF
    const productData = await fetchProductInfo(barcode);
    if (!productData) {
      return res.status(404).json({
        error: 'Product not found in Open Food Facts.',
      });
    }

    // Check if product category is in allowed food categories
    const allowedCategories = config.get('allowedFoodCategories');
    if (!allowedCategories.includes(productData.category.toLowerCase())) {
      return res.status(400).json({
        error: 'The scanned product is not recognized as a food product.',
      });
    }

    // Compute spoilage prediction using simulated ML logic
    const { recommendedTemp, recommendedHumidity, predictedSpoilageDays } = computeSpoilage(
      productData.category.toLowerCase(),
      parseFloat(temperature),
      parseFloat(humidity)
    );

    // Build response object
    const result = {
      barcode: productData.barcode,
      productName: productData.name,
      category: productData.category,
      recommendedTemp,
      recommendedHumidity,
      actualTemperature: temperature,
      actualHumidity: humidity,
      predictedSpoilageDays,
    };

    return res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { predictExpiry };
