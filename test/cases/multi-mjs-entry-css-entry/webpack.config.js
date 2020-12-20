const WebpackRemoveEmptyScripts = require("../../../index.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { script: "./script.mjs", style: "./style.css" },
  output: {
    filename: "[name].mjs",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new WebpackRemoveEmptyScripts({ silent: true }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};