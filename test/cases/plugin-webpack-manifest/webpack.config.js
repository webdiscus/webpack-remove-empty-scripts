const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('../../../src/index.js');

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public/'),
  },
  entry: { style: './src/style.css' },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({
      verbose: true,
      stage: RemoveEmptyScriptsPlugin.STAGE_BEFORE_PROCESS_PLUGINS,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // this plugin is called at chunkAsset stage and requires that empty scripts are deleted before
    new WebpackManifestPlugin({
      fileName: "./assets.json",
      publicPath: "",
      writeToFileEmit: true,
      generate(seed, files) {
        let manifest = {}
        files.forEach(function (element, index) {
          Object.assign(manifest, {
            [element.name]: { src: element.path }
          })
        })
        return manifest
      }
    }),
  ],
};