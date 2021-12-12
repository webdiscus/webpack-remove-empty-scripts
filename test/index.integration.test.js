const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

import { readDirRecursiveSync } from './utils/file';

//const modes = ['development'];
const modes = ['development', 'production'];
const cases = fs.readdirSync(path.join(__dirname, 'cases'));

// if not empty, then test only this cases
const testOnly = [
  //'css-entry-only',
  //'css-entry-with-ignored-hmr',
  //'css-entry-with-query',
  //'multi-configuration',
  //'multi-js-entry-css-entry',
  //'multi-js-entry-css-entry-extensions-do-not-match',
  //'multi-js-entry-css-entry-mjs-output-css-output',
  //'multi-mjs-entry-css-entry',
  //'multi-page+styles',
  //'single-js+css-entry',
  //'single-js+css-entry-mjs+css-output',
  //'single-js-entry-without-ext',
  //'single-mjs+css-entry',
  //'single-mjs-entry',
  //'vendor+multi-js-entry-css-entry',
  //'webpack-concatenate-modules',
];

beforeAll(() => {
  rimraf.sync(path.join(__dirname, 'output'));
});

beforeEach(() => {
  jest.setTimeout(10000);
});

describe('Webpack Integration Tests', () => {
  cases.forEach(testCase => {
    if (testOnly.length > 0 && testOnly.indexOf(testCase) < 0) return;

    modes.forEach(mode => {
      test(testCase + ' [' + mode + ']', done => {
        const testDirectory = path.join(__dirname, 'cases', testCase);
        const outputDirectory = path.join(__dirname, 'output', testCase, mode);
        const configFile = path.join(testDirectory, 'webpack.config.js');

        if (!fs.existsSync(configFile)) {
          return done('no config file for test: ' + testCase);
        }

        let baseConfig = require(configFile);
        let configDefaults = {
          mode: mode,
          context: testDirectory,
          output: {
            path: outputDirectory,
          },
        };

        let config = Array.isArray(baseConfig)
          ? baseConfig.map(conf => merge(configDefaults, conf))
          : merge(configDefaults, baseConfig);

        webpack(config, (err, stats) => {
          if (err) return done(err);
          if (stats.hasErrors()) return done(new Error(stats.toString()));
          const expected = require(path.join(testDirectory, 'expected.json'));
          const received = readDirRecursiveSync(outputDirectory, false);
          expect(received.sort()).toEqual(expected.sort());
          done();
        });
      });
    });
  });
});