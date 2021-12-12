const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./styles.css', './index.js', './index.css'],
  output: {
    filename: '[name].mjs',
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
    new WebpackRemoveEmptyScripts(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};