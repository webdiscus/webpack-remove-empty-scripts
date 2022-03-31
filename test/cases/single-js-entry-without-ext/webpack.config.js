const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  entry: './index',
  plugins: [new RemoveEmptyScriptsPlugin()],
};