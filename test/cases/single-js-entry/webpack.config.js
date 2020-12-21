const WebpackRemoveEmptyScripts = require("../../../index.js");

module.exports = {
  entry: "./index",
  plugins: [new WebpackRemoveEmptyScripts()],
};