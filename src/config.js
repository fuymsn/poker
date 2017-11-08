let config

if (process.env.NODE_CONFIG === 'test') {
  config = require('../config/test.env')
} else if (process.env.NODE_CONFIG === 'production') {
  config = require('../config/prod.env')
} else if (process.env.NODE_CONFIG === 'development') {
  config = require('../config/dev.env')
}

module.exports = config