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
    // entry as the array doesn't work with HtmlBundlerPlugin, define one file pro one entry name
    //main: ['./src/style.css', './src/main.js' ],
    // TODO: fix HtmlBundlerPlugin to extract CSS imported in JS that is defined in the entry
    main: './src/main.js' ,
    style: './src/style.css',
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
    new HtmlBundlerPlugin({
      css: {
        filename: '[name].css',
      },
      verbose: true,
    }),
    // new RemoveEmptyScriptsPlugin({
    //   enabled: true,
    //   verbose: true,
    // }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
  ],
};