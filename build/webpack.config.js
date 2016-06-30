const config = require('../config/client')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [ './src/app.js' ],
    vendor: [ 'vue', 'vue-router' ]
  },
  output: {
    path: path.resolve('./dist'), // this MUST be an absolute path
    filename: 'app_bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor_bundle.js'
    ),
    new HtmlWebpackPlugin({
      title: 'Pied Piper Admin'
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(config.apiUrl)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  }
}
