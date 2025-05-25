import { compareFiles, exceptionContain } from './utils/helpers';

beforeAll(() => {
  // important: the environment constant is used in code
  process.env.NODE_ENV_TEST = 'true';
});

describe('options tests', () => {
  test('extension as array', () => compareFiles('option-extension-array'));
  test('extension as regexp', () => compareFiles('option-extension-regexp'));
  test('ignore as array', () => compareFiles('option-ignore-array', false));
  test('ignore as string', () => compareFiles('option-ignore-string', false));
  test('remove', () => compareFiles('option-remove'));
});

describe('common use case tests', () => {
  test('css-entry-only', () => compareFiles( 'css-entry-only'));
  test('css-import', () => compareFiles( 'css-import'));
  test('css-entry-with-ignored-hmr', () => compareFiles( 'css-entry-with-ignored-hmr', false));
  test('css-entry-with-query', () => compareFiles( 'css-entry-with-query'));
  test('multi-configuration', () => compareFiles( 'multi-configuration'));
  test('multi-js-entry-css-entry', () => compareFiles( 'multi-js-entry-css-entry'));
  test('multi-js-entry-css-entry-extensions-do-not-match', () => compareFiles( 'multi-js-entry-css-entry-extensions-do-not-match'));
  test('multi-js-entry-css-entry-mjs-output-css-output', () => compareFiles( 'multi-js-entry-css-entry-mjs-output-css-output'));
  test('multi-mjs-entry-css-entry', () => compareFiles( 'multi-mjs-entry-css-entry'));
  test('multi-page+styles', () => compareFiles( 'multi-page+styles'));
  test('single-js+css-entry', () => compareFiles( 'single-js+css-entry'));
  test('single-js+css-entry-mjs+css-output', () => compareFiles( 'single-js+css-entry-mjs+css-output'));
  test('single-js-entry-without-ext', () => compareFiles( 'single-js-entry-without-ext'));
  test('single-mjs+css-entry', () => compareFiles( 'single-mjs+css-entry'));
  test('single-mjs-entry', () => compareFiles( 'single-mjs-entry'));
  test('vendor+multi-js-entry-css-entry', () => compareFiles( 'vendor+multi-js-entry-css-entry'));
  test('webpack-concatenate-modules', () => compareFiles( 'webpack-concatenate-modules'));
});

describe('complex use cases with specific webpack plugins', () => {
  // remove empty scripts AFTER other plugin is called
  test('keep extracted wordpress dependencies', () => compareFiles( 'plugin-wordpress-dependency'));
  // remove empty scripts BEFORE other plugin will be called
  test('manifest-plugin', () => compareFiles( 'plugin-webpack-manifest'));
});

describe('exceptions', () => {
  test('execute template function', () => {
    const containString = `Invalid value of config option 'stage'`;
    return exceptionContain( 'exception-option-stage-invalid', containString);
  });
});