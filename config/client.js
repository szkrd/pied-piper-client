require('dotenv').config()

const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3100/api',
  devPort: process.env.DEV_PORT || 3000
}

module.exports = config
