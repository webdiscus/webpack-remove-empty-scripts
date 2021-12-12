const WebpackRemoveEmptyScripts = require('../../../src/index.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    apage: ['./apage.js'],
    bpage: {
      import: './bpage.js',
      filename: 'bpage-other.js',
    },
    about: ['./about.html'], // pass the compiled into js file for other handlers
    styles: ['./apage.css', './bpage.css', './common.css'],
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
    new WebpackRemoveEmptyScripts({
      //verbose: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};