module.exports = {
  devtool: false,
  // avoid double error output in console
  stats: 'errors-warnings',

  output: {
    filename: '[name].js',
    // clean the output directory before emit
    clean: true,
  },

  plugins: [],

  module: {
    rules: [],
  },

  // optimization: {
  //   removeEmptyChunks: true,
  //   mergeDuplicateChunks: true,
  //   usedExports: true,
  //   concatenateModules: true,
  // },
};