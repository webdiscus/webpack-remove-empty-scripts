const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
  },
  entry: {
    main: ['./src/main.js' ],
    style: ['./src/style.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          { resourceQuery: /rawurl/, type: 'asset/resource', generator: { filename: '[name].css' } }, // ?rawurl => returns URL string
          { use: [MiniCssExtractPlugin.loader, 'css-loader'] } // normal imports
        ]
      }
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};