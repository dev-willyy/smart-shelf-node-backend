require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('config');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');
const expiryRoutes = require('./routes/expiryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    env: config.get('env'),
  });
});

// Register our predictive expiry endpoint
app.use('/api', expiryRoutes);

// Global error handler
app.use(errorHandler);

const PORT = config.get('port') || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} (env: ${config.get('env')})`);
});
