const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
  },
  entry: {
    'style': './src/style.css',
    'style.rem': './src/style.css',
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
      verbose: true,
      remove: /(?<!\.rem)\.(js|mjs)$/, // generated assets `*.js` must be removed, but not `*.rem.js`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};