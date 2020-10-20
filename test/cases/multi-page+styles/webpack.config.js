const WebpackRemoveEmptyScripts = require("../../../index.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    apage: ["./apage.js"],
    bpage: ["./bpage.js"],
    styles: ["./apage.css", "./bpage.css", "./common.css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new WebpackRemoveEmptyScripts(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
