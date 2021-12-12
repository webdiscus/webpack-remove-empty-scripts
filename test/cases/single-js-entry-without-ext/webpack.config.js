const WebpackRemoveEmptyScripts = require('../../../src/index.js');

module.exports = {
  entry: './index',
  plugins: [new WebpackRemoveEmptyScripts()],
};