const path = require('path');

module.exports = {
  paths: {
    base: __dirname,
    testSource: path.join(__dirname, 'cases'),
    // relative path in the test directory to web root dir name, same as by a web server (e.g. nginx)
    webRoot: '/public/',
    // relative path in the test directory to expected files for test
    expected: '/expected/',
    // relative path in the public directory
    output: '/assets/',
  }
}