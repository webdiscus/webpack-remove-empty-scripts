const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

const jsConfig = {
  devtool: 'source-map',
  stats: 'minimal',
  entry: {
    'main': './src/js/main.js',
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js',
    clean: false, // must be false, otherwise output of first config will be removed
  },
  plugins: [
    new DependencyExtractionWebpackPlugin(),
  ],
};

const styleConfig = {
  devtool: 'source-map',
  stats: 'minimal',
  entry: {
    'main': './src/sass/main.scss',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'public/css'),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DependencyExtractionWebpackPlugin(),
    new RemoveEmptyScriptsPlugin({
      verbose: true,
      stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
    }),
  ],
};

module.exports = [
  jsConfig,
  styleConfig,
];