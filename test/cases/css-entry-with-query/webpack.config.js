const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { script: './script.js', style: './style.css?global' },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};