const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const middlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&name=';

module.exports = {
  entry: {
    script: ['./script.js', middlewareScript + 'script'],
    style: ['./style.css', middlewareScript + 'client'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new WebpackRemoveEmptyScripts({
      ignore: [
        'webpack-hot-middleware',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};