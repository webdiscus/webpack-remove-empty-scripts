const WebpackRemoveEmptyScripts = require("../../../index.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./index.mjs", "./index.css"],
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