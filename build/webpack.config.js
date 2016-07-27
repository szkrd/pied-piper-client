// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const config = require('../config/client')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/app.js'
    ],
    vendor: [
      'vue',
      'vue-router',
      'moment',
      'jquery',
      'bootstrap',
      './node_modules/jquery.json-viewer/json-viewer/jquery.json-viewer.js' // no main :(
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // this MUST be an absolute path
    publicPath: '/', // boom, I'll come up w smg better...
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor.js'
    ),
    new HtmlWebpackPlugin({
      title: 'Pied Piper Admin'
    }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(config.apiUrl)
    }),
    new webpack.ProvidePlugin({ // bootstrap
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.NormalModuleReplacementPlugin(
      /^(net|dns)$/,
      path.resolve(__dirname, '../src/utils/serverShim.js')
    ),
    new webpack.HotModuleReplacementPlugin() // , TODO: fix browsersync
    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 3096,
    //   proxy: 'http://localhost:3098/'
    // }, {
    //   reload: false
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-regenerator']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
}
