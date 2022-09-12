const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
import { paths } from '../config';

const prepareWebpackConfig = (dirname, webpackOpts = {}) => {
  const testPath = path.join(paths.testSource, dirname),
    configFile = path.join(testPath, 'webpack.config.js'),
    commonConfigFile = path.join(paths.base, 'webpack.common.js');

  if (!fs.existsSync(configFile)) {
    throw new Error(`The config file '${configFile}' not found for test: ${dirname}`);
  }

  let baseConfig = {
      // the home directory for webpack should be the same where the tested webpack.config.js located
      context: testPath,
      output: {
        // clean the output directory before emit
        clean: true,
      },
    },
    testConfig = require(configFile),
    commonConfig = require(commonConfigFile);

  // remove module rules in common config when custom rules are defined by test config or options
  if ((webpackOpts.module && webpackOpts.module.rules) || (testConfig.module && testConfig.module.rules)) {
    commonConfig.module.rules = [];
  }

  return Array.isArray(testConfig) ?
    testConfig.map(conf => merge(baseConfig, commonConfig, webpackOpts, conf))
    : merge(baseConfig, commonConfig, webpackOpts, testConfig);
};

export const compile = (dirname, webpackOpts) =>
  new Promise((resolve, reject) => {
    let config;

    try {
      config = prepareWebpackConfig(dirname, webpackOpts);
    } catch (error) {
      reject('[webpack prepare config] ' + error.toString());
      return;
    }

    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        reject('[webpack compiler] ' + error);
        return;
      }

      if (stats.hasErrors()) {
        reject('[webpack compiler stats] ' + stats.toString());
        return;
      }

      resolve(stats);
    });
  });