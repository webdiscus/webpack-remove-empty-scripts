const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  entry: './index.mjs',
  output: {
    filename: '[name].mjs',
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
  ],
};