const config = require('config');

module.exports = {
  env: config.get('env'),
  port: config.get('port'),
  mongoURI: config.get('mongoURI'),
};
