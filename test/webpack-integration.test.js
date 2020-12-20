/* eslint-disable import/no-dynamic-require, global-require */

const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const modes = ["development", "production"];
const cases = fs.readdirSync(path.join(__dirname, "cases"));

// if not empty, then test only this cases
const testOnly = [
];

beforeAll(() => {
  rimraf.sync(path.join(__dirname, "outputs"));
});

beforeEach(() => {
  jest.setTimeout(10000);
});

describe("Webpack Integration Tests", () => {
  cases.forEach(testCase => {
    if (testOnly.length > 0 && testOnly.indexOf(testCase) < 0) {
      return;
    }

    modes.forEach(mode => {
      it(testCase + " [" + mode + "]", done => {
        const testDirectory = path.join(__dirname, "cases", testCase);
        const outputDirectory = path.join(__dirname, "outputs", testCase, mode);
        const configFile = path.join(testDirectory, "webpack.config.js");

        if (!fs.existsSync(configFile)) {
          return done("no config file for test: " + testCase);
        }

        let baseConfig = require(configFile);
        let configDefaults = {
          mode: mode,
          context: testDirectory,
          output: {
            path: outputDirectory,
          },
        };

        let config;
        if (Array.isArray(baseConfig)) {
          config = baseConfig.map(c => merge(configDefaults, c));
        } else {
          config = merge(configDefaults, baseConfig);
        }

        webpack(config, (err, stats) => {
          if (err) return done(err);
          if (stats.hasErrors()) return done(new Error(stats.toString()));
          const expectations = require(path.join(
            testDirectory,
            "expected.json"
          ));
          const outputs = fs.readdirSync(outputDirectory);
          expect(outputs.sort()).toEqual(expectations.sort());
          done();
        });
      });
    });
  });
});