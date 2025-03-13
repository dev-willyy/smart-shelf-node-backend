const express = require('express');
const { predictExpiry } = require('../controllers/expiryController');

const router = express.Router();

/**
 * POST: /api/predict-expiry
 */
router.post('/predict-expiry', predictExpiry);

module.exports = router;
