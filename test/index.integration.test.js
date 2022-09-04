import path from 'path';
import { getCompareFileList, compareFileList, compareFileListAndContent } from './utils/helpers';

const PATHS = {
  base: __dirname,
  testSource: path.join(__dirname, 'cases'),
  // relative path in the test directory to web root dir name, same as by a web server (e.g. nginx)
  webRoot: '/public/',
  // relative path in the test directory to expected files for test
  expected: '/expected/',
  // relative path in the public directory
  output: '/assets/',
};

const testTimeout = 5000;

beforeAll(() => {});

beforeEach(() => {
  jest.setTimeout(testTimeout);
});

describe('production options tests', () => {
  test('option-extension-array', (done) => {
    compareFileListAndContent(PATHS, 'option-extension-array', done);
  });

  test('option-extension-regexp', (done) => {
    compareFileListAndContent(PATHS, 'option-extension-regexp', done);
  });

  test('option-ignore-array', (done) => {
    compareFileList(PATHS, 'option-ignore-array', done);
  });

  test('option-ignore-string', (done) => {
    compareFileList(PATHS, 'option-ignore-string', done);
  });

  test('option-remove', (done) => {
    compareFileListAndContent(PATHS, 'option-remove', done);
  });
});

describe('production tests', () => {
  test('css-import', (done) => {
    compareFileListAndContent(PATHS, 'css-import', done);
  });

  test('css-entry-only', (done) => {
    compareFileListAndContent(PATHS, 'css-entry-only', done);
  });

  test('css-entry-with-ignored-hmr', (done) => {
    compareFileList(PATHS, 'css-entry-with-ignored-hmr', done);
  });

  test('css-entry-with-query', (done) => {
    compareFileListAndContent(PATHS, 'css-entry-with-query', done);
  });

  test('multi-configuration', (done) => {
    compareFileListAndContent(PATHS, 'multi-configuration', done);
  });

  test('multi-js-entry-css-entry', (done) => {
    compareFileListAndContent(PATHS, 'multi-js-entry-css-entry', done);
  });

  test('multi-js-entry-css-entry-extensions-do-not-match', (done) => {
    compareFileListAndContent(PATHS, 'multi-js-entry-css-entry-extensions-do-not-match', done);
  });

  test('multi-js-entry-css-entry-mjs-output-css-output', (done) => {
    compareFileListAndContent(PATHS, 'multi-js-entry-css-entry-mjs-output-css-output', done);
  });

  test('multi-mjs-entry-css-entry', (done) => {
    compareFileListAndContent(PATHS, 'multi-mjs-entry-css-entry', done);
  });

  test('multi-page+styles', (done) => {
    compareFileListAndContent(PATHS, 'multi-page+styles', done);
  });

  test('single-js+css-entry', (done) => {
    compareFileListAndContent(PATHS, 'single-js+css-entry', done);
  });

  test('single-js+css-entry-mjs+css-output', (done) => {
    compareFileListAndContent(PATHS, 'single-js+css-entry-mjs+css-output', done);
  });

  test('single-js-entry-without-ext', (done) => {
    compareFileListAndContent(PATHS, 'single-js-entry-without-ext', done);
  });

  test('single-mjs+css-entry', (done) => {
    compareFileListAndContent(PATHS, 'single-mjs+css-entry', done);
  });

  test('single-mjs-entry', (done) => {
    compareFileListAndContent(PATHS, 'single-mjs-entry', done);
  });

  test('vendor+multi-js-entry-css-entry', (done) => {
    compareFileListAndContent(PATHS, 'vendor+multi-js-entry-css-entry', done);
  });

  test('webpack-concatenate-modules', (done) => {
    compareFileListAndContent(PATHS, 'webpack-concatenate-modules', done);
  });
});

describe('complex use cases with vendors', () => {
  test('keep extracted wordpress dependencies', (done) => {
    compareFileListAndContent(PATHS, 'wordpress-dependency', done);
  });
});