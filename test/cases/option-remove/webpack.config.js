const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'style': './style.css',
    'style.rem': './style.css',
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
      verbose: true,
      remove: /(?<!\.rem)\.(js|mjs)$/, // generated assets `*.js` must be removed, but not `*.rem.js`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};