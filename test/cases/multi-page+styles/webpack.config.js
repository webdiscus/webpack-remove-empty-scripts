const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
  },
  entry: {
    apage: ['./src/apage.js'],
    bpage: {
      import: './src/bpage.js',
      filename: 'bpage-other.js',
    },
    about: ['./src/about.html'], // pass the compiled into js file for other handlers
    styles: ['./src/apage.css', './src/bpage.css', './src/common.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({
      //verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};