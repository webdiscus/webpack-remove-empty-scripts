const path = require('path');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public/'),
  },
  entry: './src/index',
  plugins: [new RemoveEmptyScriptsPlugin()],
};