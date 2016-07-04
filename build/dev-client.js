const webpack = require('webpack')
const config = require('./webpack.config')
const clientConfig = require('../config/client')
const WebpackDevServer = require('webpack-dev-server')
const devPort = clientConfig.devPort

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${devPort}/`)

const devServer = new WebpackDevServer(webpack(config), {
  stats: { colors: true },
  hot: true
})

console.log(`Webpack dev server listening on ${devPort}`)
devServer.listen(devPort, 'localhost')
