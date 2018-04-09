require('dotenv').config()
const fs = require('fs')
const webpack = require('webpack')
const config = require('./webpack.config')
const clientConfig = require('../config/client')
const WebpackDevServer = require('webpack-dev-server')
const devPort = clientConfig.devPort

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${devPort}/`)

const wdsConfig = {
  stats: { colors: true },
  hot: true
}

let https = false
const keyPath = process.env.HTTPS_KEY
const certPath = process.env.HTTPS_CERT // HTTPS_CA not needed

if (keyPath && certPath) {
  https = true
  wdsConfig.https = {
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT)
  }
}

const devServer = new WebpackDevServer(webpack(config), wdsConfig)

console.log(`Webpack dev server listening on ${devPort}, ${https ? 'https' : 'http'}`)
devServer.listen(devPort, 'localhost')
