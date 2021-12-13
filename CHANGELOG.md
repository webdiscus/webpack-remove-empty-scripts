## 0.7.3 (Jan 30, 2022) The last stable version
- added color verbose output via ANSI color library - ansis
- added the test case for styles imported from javascript 

## 0.7.2 (Dec 13, 2021)
- added new option `enable` to enable / disable the plugin, e.g. by development
- added supports of `RegExp` for option `extensions`
- remove deprecated option `silent`, use `verbose` to show process information (no braking change)
- added GitHub workflow + codecov
- update packages
- update readme

## 0.7.1 (Jan 14, 2021)
### Bugfixes
- fix the issue infinite recursion by collect of resources from dependency modules by usage in react app some big components with many thousands dependencies

## 0.7.0 (Dec 21, 2020)
### Breaking change
- deprecate the `silent` option, it will be removed on Juni 30, 2021. Use option `verbose: true` to show in console each removed empty file. Defaults, `verbose: false`.

### Bugfixes
- fix issue `Maximum call stack size exceeded` in all cases, for example, by usage the webpack setting `optimization.concatenateModules: true` and:
  - import react
  - import redux
  - webpack setting `externals.jquery: 'jQuery'` or other external libs
- The issue if first in webpack entries are a styles and then a scripts.

## 0.6.4 (Dec 19, 2020)
- fix the error: `Maximum call stack size exceeded` with webpack setting `optimization.concatenateModules: true`and usage in script imports from `react` and `redux`
- added the test case for single style without a scripts in webpack config
- added silent mode in tests to suppress output log info in the console
- improve the option `ignore`:   
  - it can be the array of string or RegExp
  - added default value of `ignore` as `['/node_modules/']` to ignore resources from `node_modules` path
- update npm packages.

## 0.6.3 (Oct 25, 2020)
- fix BREAKING CHANGE in Webpack 5: no more changes should happen to `Compilation.assets`
- update code accord new API

## 0.6.2 (Oct 24, 2020)
Update npm packages.

## 0.6.1 (Oct 20, 2020)
The fork of original [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries) (ver. 0.6.0) for support only Webpack 5 and above. 
The Webpack 4 is no longer supported.

### The changes from original version 0.6.0: 
 
- feature: considers the use hash after the  .js and .mjs extension in file format like `.js?[hash]` or `.mjs?[hash]`. 
The idea and requirement belong to [MatiasMorici](https://github.com/MatiasMorici) from [PR](https://github.com/fqborges/webpack-fix-style-only-entries/pull/27/commits/57eeecbcb85926578770c3845465e4012b02a196) 
- In Webpack 5 fixed deprecation messages:
    - DEP_WEBPACK_CHUNK_HAS_ENTRY_MODULE
    - DEP_WEBPACK_CHUNK_ENTRY_MODULE
    - DEP_WEBPACK_DEPRECATION_ARRAY_TO_SET
    - DEP_WEBPACK_MODULE_INDEX
 
- update all packages for Webpack 5.
- fix integration test script for using with Webpack 5.
- fix a BUG of `terser-webpack-plugin` (generate the futile file `vendor.js.LICENSE.txt`) in the production test `vendor+multi-js-entry-css-entry`.
- fix module structure in README.md.

## 0.6.0 (Oct 13, 2020)
Being overly careful here, this version is not breaking for almost all the existing users. It could possibly break in some edge cases, since it changes how modules are collected (from global to one each compilation) or if you have a workaround for a working webpack multi configuration.
- BREAKING (POSSIBLY): Use a dedicated cache for every compilation (Prevent arbitrary files deletion when using Webpack with multi configurations) (PR [#39](https://github.com/fqborges/webpack-fix-style-only-entries/pull/39))

## 0.5.2 (Oct 07, 2020)
 - supports Webpack 5 using ModuleGraph API (PR [#38](https://github.com/fqborges/webpack-fix-style-only-entries/pull/38))
 - npm audit fix: ([ea9dd7](https://github.com/fqborges/webpack-fix-style-only-entries/commit/ea9dd7bd7ade5b16623064a4850de39545e1e18e))

## 0.5.1 (Jun 13, 2020)
 - fix Maximum call stack size exceeded (PR [#34](https://github.com/fqborges/webpack-fix-style-only-entries/pull/34))
 - added CHANGELOG ([3e3767](https://github.com/fqborges/webpack-fix-style-only-entries/commit/3e3767d8998a53d807b5d5b10643d05b800aa79a))

## 0.5.0 (May 18, 2020)
 - fix for [#23](https://github.com/fqborges/webpack-fix-style-only-entries/issues/23) ([37d350](https://github.com/fqborges/webpack-fix-style-only-entries/commit/37d350eec83f49c0b12729a93aa6cf2f96d92d0b))
 - fix for [#24](https://github.com/fqborges/webpack-fix-style-only-entries/issues/24) ([d92bec](https://github.com/fqborges/webpack-fix-style-only-entries/commit/d92bec4be5fe4b97a8651a9206fa2281ce1424be))
 - BREAKING: added styl and sass to default extensions ([247a5c](https://github.com/fqborges/webpack-fix-style-only-entries/commit/247a5c9f963e4d7598539056ab3f709b0558b4ec))
 - added LICENSE.txt ([220e20](https://github.com/fqborges/webpack-fix-style-only-entries/commit/220e20eeb9bc95652a942812a424aadd92ec7d1f))

## 0.4.0 (Sep 8, 2019)
 - feat: add support for module js files (PR [#21](https://github.com/fqborges/webpack-fix-style-only-entries/pull/21))
