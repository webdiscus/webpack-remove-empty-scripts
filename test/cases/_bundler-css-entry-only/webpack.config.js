const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const RemoveEmptyScriptsPlugin = require('../../../src/index.js');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
  },
  entry: {
    style: './src/style.css',
    'assets/css/style': './src/style.css',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //use: [MiniCssExtractPlugin.loader, 'css-loader'],
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlBundlerPlugin(),
    // new RemoveEmptyScriptsPlugin({
    //   enabled: true,
    //   verbose: true,
    // }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
  ],
};