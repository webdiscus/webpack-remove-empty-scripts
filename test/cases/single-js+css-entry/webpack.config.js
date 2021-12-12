const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Note: very important for test use at 0 position a css file and at 1 position a js file.
  entry: ['./index.css', './index.js'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new WebpackRemoveEmptyScripts({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};