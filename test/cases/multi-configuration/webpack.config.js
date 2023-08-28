const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

const baseConfig = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
    clean: false, // must be false, otherwise output of first config will be removed
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
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

module.exports = [
  {
    entry: { scriptA: './src/script.js', styleA: './src/style.css' },
    ...baseConfig,
  },
  {
    entry: { styleB: './src/style.css', scriptB: './src/script.js' },
    ...baseConfig,
  },
];