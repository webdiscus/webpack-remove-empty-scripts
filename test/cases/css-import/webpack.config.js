const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: ['./style.css', './main.js' ],
    style: ['./style.css'],
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
    new RemoveEmptyScriptsPlugin({
      enabled: true,
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};