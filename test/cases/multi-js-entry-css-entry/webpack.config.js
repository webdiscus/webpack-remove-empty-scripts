const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { script: './script.js', style: './style.css' },
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