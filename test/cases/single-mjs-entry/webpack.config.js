const path = require('path');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].mjs',
  },
  entry: './src/index.mjs',
  plugins: [
    new RemoveEmptyScriptsPlugin(),
  ],
};