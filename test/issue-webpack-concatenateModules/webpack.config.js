const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const RemoveEmptyScriptsPlugin = require("../../index.js")

const entries = {
  app: path.join(__dirname, 'src/react-app.js')
}

module.exports = (env = {}, argv = {}) => {
  const isDev = argv.mode !== 'production';
  const filename = '[name]';

  process.env.NODE_ENV = argv.mode;

  return {
    mode: isDev ? 'development' : 'production',
    entry: entries,
    stats: {
      colors: true,
      preset: 'minimal',
    },
    output: {
      path: path.resolve(__dirname, 'build/_assets'),
      publicPath: '/_assets/',
      filename: `${filename}.js`,
    },
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: `${filename}.css`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      //concatenateModules: true,
    }
  };
};