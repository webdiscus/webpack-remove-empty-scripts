import path from 'path';
import { readDirRecursiveSync, readTextFileSync } from './file';
import { compile } from './webpack';
import { paths } from '../config';

/**
 * This is the patch for some environments, like `jest`.
 * The `jest` hasn't in global scope the `btoa` function which used in `css-loader`.
 */
if (typeof global.btoa === 'undefined') {
  global.btoa = (input) => Buffer.from(input, 'latin1').toString('base64');
}

export const getCompareFileList = function (receivedPath, expectedPath) {
  return {
    received: readDirRecursiveSync(receivedPath, false).sort(),
    expected: readDirRecursiveSync(expectedPath, false).sort(),
  };
};

export const getCompareFileContents = function (receivedFile, expectedFile, filter = /.(html|css|css.map|js|json|js.map)$/) {
  return !filter || filter.test(receivedFile) && filter.test(expectedFile)
    ? { received: readTextFileSync(receivedFile), expected: readTextFileSync(expectedFile) }
    : { received: '', expected: '' };
};

export const compareFileListAndContent = (done, dirname, filter = /.(html|css|css.map|js|json|js.map)$/) => {
  const absTestPath = path.join(paths.testSource, dirname),
    webRootPath = path.join(absTestPath, paths.webRoot),
    expectedPath = path.join(absTestPath, paths.expected);

  compile(dirname, {}).then(() => {
    const { received: receivedFiles, expected: expectedFiles } = getCompareFileList(webRootPath, expectedPath);
    expect(receivedFiles).toEqual(expectedFiles);

    expectedFiles.forEach((file) => {
      const { received, expected } = getCompareFileContents(
        path.join(webRootPath, file),
        path.join(expectedPath, file),
        filter
      );
      expect(received).toEqual(expected);
    });
    done();
  });
};

export const compareFileList = (done, dirname) => {
  const absTestPath = path.join(paths.testSource, dirname),
    webRootPath = path.join(absTestPath, paths.webRoot),
    expectedPath = path.join(absTestPath, paths.expected);

  compile(dirname, {}).then(() => {
    const { received: receivedFiles, expected: expectedFiles } = getCompareFileList(webRootPath, expectedPath);
    expect(receivedFiles).toEqual(expectedFiles);
    done();
  });
};

export const exceptionContain = function (done, dirname, containString) {
  compile(dirname, {})
    .then(() => {
      throw new Error('the test should throw an error');
    })
    .catch((error) => {
      expect(error.toString()).toContain(containString);
      done();
    });
};

export const stdoutContain = function (done, dirname, containString) {
  const stdout = jest.spyOn(console._stdout, 'write').mockImplementation(() => {});

  compile(dirname, {}).then(() => {
    const { calls } = stdout.mock;
    const output = calls.length > 0 ? calls[0][0] : '';

    stdout.mockClear();
    stdout.mockRestore();

    expect(output).toContain(containString);
    done();
  });
};