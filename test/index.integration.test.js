import { compareFileList, compareFileListAndContent, exceptionContain } from './utils/helpers';
import { testTimeout } from './jest.config';

beforeAll(() => {});

beforeEach(() => {
  jest.setTimeout(testTimeout);
});

describe('production options tests', () => {
  test('option-extension-array', (done) => {
    compareFileListAndContent(done, 'option-extension-array');
  });

  test('option-extension-regexp', (done) => {
    compareFileListAndContent(done, 'option-extension-regexp');
  });

  test('option-ignore-array', (done) => {
    compareFileList(done, 'option-ignore-array');
  });

  test('option-ignore-string', (done) => {
    compareFileList(done, 'option-ignore-string');
  });

  test('option-remove', (done) => {
    compareFileListAndContent(done, 'option-remove');
  });
});

describe('production tests', () => {
  test('css-import', (done) => {
    compareFileListAndContent(done, 'css-import');
  });

  test('css-entry-only', (done) => {
    compareFileListAndContent(done, 'css-entry-only');
  });

  test('css-entry-with-ignored-hmr', (done) => {
    compareFileList(done, 'css-entry-with-ignored-hmr');
  });

  test('css-entry-with-query', (done) => {
    compareFileListAndContent(done, 'css-entry-with-query');
  });

  test('multi-configuration', (done) => {
    compareFileListAndContent(done, 'multi-configuration');
  });

  test('multi-js-entry-css-entry', (done) => {
    compareFileListAndContent(done, 'multi-js-entry-css-entry');
  });

  test('multi-js-entry-css-entry-extensions-do-not-match', (done) => {
    compareFileListAndContent(done, 'multi-js-entry-css-entry-extensions-do-not-match');
  });

  test('multi-js-entry-css-entry-mjs-output-css-output', (done) => {
    compareFileListAndContent(done, 'multi-js-entry-css-entry-mjs-output-css-output');
  });

  test('multi-mjs-entry-css-entry', (done) => {
    compareFileListAndContent(done, 'multi-mjs-entry-css-entry');
  });

  test('multi-page+styles', (done) => {
    compareFileListAndContent(done, 'multi-page+styles');
  });

  test('single-js+css-entry', (done) => {
    compareFileListAndContent(done, 'single-js+css-entry');
  });

  test('single-js+css-entry-mjs+css-output', (done) => {
    compareFileListAndContent(done, 'single-js+css-entry-mjs+css-output');
  });

  test('single-js-entry-without-ext', (done) => {
    compareFileListAndContent(done, 'single-js-entry-without-ext');
  });

  test('single-mjs+css-entry', (done) => {
    compareFileListAndContent(done, 'single-mjs+css-entry');
  });

  test('single-mjs-entry', (done) => {
    compareFileListAndContent(done, 'single-mjs-entry');
  });

  test('vendor+multi-js-entry-css-entry', (done) => {
    compareFileListAndContent(done, 'vendor+multi-js-entry-css-entry');
  });

  test('webpack-concatenate-modules', (done) => {
    compareFileListAndContent(done, 'webpack-concatenate-modules');
  });
});

describe('complex use cases with specific webpack plugins', () => {
  // remove empty scripts AFTER other plugin is called
  test('keep extracted wordpress dependencies', (done) => {
    compareFileListAndContent(done, 'plugin-wordpress-dependency');
  });

  // remove empty scripts BEFORE other plugin will be called
  test('manifest-plugin', (done) => {
    compareFileListAndContent(done, 'plugin-webpack-manifest');
  });
});

describe('exception tests', () => {
  test('exception: execute template function', (done) => {
    const containString = `Invalid value of config option 'stage'`;
    exceptionContain(done, 'exception-option-stage-invalid', containString);
  });
});