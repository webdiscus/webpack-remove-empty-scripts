const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].mjs',
  },
  entry: { script: './src/script.js', style: './src/style.css' },
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