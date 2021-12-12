const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    style: './style.css',
    'assets/css/style': './style.css',
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
      enabled: true,
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};