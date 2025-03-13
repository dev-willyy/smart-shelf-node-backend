/**
 * A simulated knowledge base mapping product categories to recommended conditions.
 */
const recommendedConditions = {
  dairy: { temp: 4, humidity: 50, baseline: 14 },
  meat: { temp: 2, humidity: 60, baseline: 7 },
  beverages: { temp: 4, humidity: 55, baseline: 30 },
  fruit: { temp: 5, humidity: 80, baseline: 10 },
  vegetables: { temp: 4, humidity: 85, baseline: 8 },
  bakery: { temp: 20, humidity: 50, baseline: 3 },
  unknown: { temp: 5, humidity: 60, baseline: 10 },
};

/**
 * computeSpoilage(category, actualTemp, actualHumidity)
 * Returns recommended storage values and predicted spoilage days.
 */
function computeSpoilage(category, actualTemp, actualHumidity) {
  const rec = recommendedConditions[category] || recommendedConditions.unknown;
  const recommendedTemp = rec.temp;
  const recommendedHumidity = rec.humidity;
  let baselineDays = rec.baseline;

  // Temperature penalty: For every degree above recommended, subtract 1 day; below recommended subtract 0.5 day
  const tempDiff = actualTemp - recommendedTemp;
  if (tempDiff > 0) {
    baselineDays -= tempDiff;
  } else {
    baselineDays -= Math.abs(tempDiff) * 0.5;
  }

  // Humidity penalty: For every 5% deviation, subtract 1 day
  const humPenalty = Math.floor(Math.abs(actualHumidity - recommendedHumidity) / 5);
  baselineDays -= humPenalty;

  const predictedSpoilageDays = Math.max(1, Math.floor(baselineDays));

  return {
    recommendedTemp,
    recommendedHumidity,
    predictedSpoilageDays,
  };
}

module.exports = { computeSpoilage };
