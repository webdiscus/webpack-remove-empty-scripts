## 0.7.1 (Jan 14, 2021)
### Bugfixes
- The issue infinite recursion by collect of resources from dependency modules by usage in react app some big components with many thousands dependencies.

## 0.7.0 (Dec 21, 2020)
### Breaking change
- The `silent` option is deprecated and will be removed on Juni 30, 2021. Use option `verbose: true` to show in console each removed empty file. Defaults, `verbose: false`.

### Bugfixes
- The issue `Maximum call stack size exceeded` was general fixed in all cases, for example, by usage the webpack setting `optimization.concatenateModules: true` and:
  - import react
  - import redux
  - webpack setting `externals.jquery: 'jQuery'` or other external libs
- The issue if first in webpack entries are a styles and then a scripts.

## 0.6.4 (Dec 19, 2020)
- Bugfix the error: `Maximum call stack size exceeded` with webpack setting `optimization.concatenateModules: true`and usage in script imports from `react` and `redux`. 
- Add test case for single style without a scripts in webpack config.
- Add silent mode in tests to suppress output log info in the console.
- The option `ignore` can be the array of string or RegExp. Add default value of `ignore` as `['/node_modules/']` to ignore resources from `node_modules` path. 
- Update npm packages.

## 0.6.3 (Oct 25, 2020)
Fix BREAKING CHANGE in Webpack 5: No more changes should happen to `Compilation.assets`. Update code accord new API.

## 0.6.2 (Oct 24, 2020)
Update npm packages.

## 0.6.1 (Oct 20, 2020)
The fork of original `https://github.com/fqborges/webpack-fix-style-only-entries` (ver. 0.6.0) for support only Webpack 5 and above. 
The Webpack 4 is no longer supported.

The changes from original version 0.6.0: 
 
- Added the feature: considers the use hash after the  .js and .mjs extension in file format like `.js?[hash]` or `.mjs?[hash]`. 
The idea and requirement belong to https://github.com/MatiasMorici from PR https://github.com/fqborges/webpack-fix-style-only-entries/pull/27/commits/57eeecbcb85926578770c3845465e4012b02a196
- In Webpack 5 fixed deprecation messages:
    - DEP_WEBPACK_CHUNK_HAS_ENTRY_MODULE
    - DEP_WEBPACK_CHUNK_ENTRY_MODULE
    - DEP_WEBPACK_DEPRECATION_ARRAY_TO_SET
    - DEP_WEBPACK_MODULE_INDEX
 
- Update all packages for Webpack 5.
- Fix integration test script for using with Webpack 5.
- Fix a BUG of `terser-webpack-plugin` (generate the futile file `vendor.js.LICENSE.txt`) in the production test `vendor+multi-js-entry-css-entry`.
- Fix module structure in README.md.

## 0.6.0 (Oct 13, 2020)
Being overly careful here, this version is not breaking for almost all the existing users. It could possibly break in some edge cases, since it changes how modules are collected (from global to one each compilation) or if you have a workaround for a working webpack multi configuration.
- BREAKING (POSSIBLY): Use a dedicated cache for every compilation (Prevent arbitrary files deletion when using Webpack with multi configurations) (PR [#39](https://github.com/fqborges/webpack-fix-style-only-entries/pull/39))

## 0.5.2 (Oct 07, 2020)
 - Webpack 5 support using ModuleGraph API (PR [#38](https://github.com/fqborges/webpack-fix-style-only-entries/pull/38))
 - npm audit fix: ([ea9dd7](https://github.com/fqborges/webpack-fix-style-only-entries/commit/ea9dd7bd7ade5b16623064a4850de39545e1e18e))

## 0.5.1 (Jun 13, 2020)
 - Fix Maximum call stack size exceeded (PR [#34](https://github.com/fqborges/webpack-fix-style-only-entries/pull/34))
 - Added CHANGELOG ([3e3767](https://github.com/fqborges/webpack-fix-style-only-entries/commit/3e3767d8998a53d807b5d5b10643d05b800aa79a))

## 0.5.0 (May 18, 2020)
 - fix for [#23](https://github.com/fqborges/webpack-fix-style-only-entries/issues/23) ([37d350](https://github.com/fqborges/webpack-fix-style-only-entries/commit/37d350eec83f49c0b12729a93aa6cf2f96d92d0b))
 - fix for [#24](https://github.com/fqborges/webpack-fix-style-only-entries/issues/24) ([d92bec](https://github.com/fqborges/webpack-fix-style-only-entries/commit/d92bec4be5fe4b97a8651a9206fa2281ce1424be))
 - BREAKING: added styl and sass to default extensions ([247a5c](https://github.com/fqborges/webpack-fix-style-only-entries/commit/247a5c9f963e4d7598539056ab3f709b0558b4ec))
 - added LICENSE.txt ([220e20](https://github.com/fqborges/webpack-fix-style-only-entries/commit/220e20eeb9bc95652a942812a424aadd92ec7d1f))

## 0.4.0 (Sep 8, 2019)
 - feat: add support for module js files (PR [#21](https://github.com/fqborges/webpack-fix-style-only-entries/pull/21))