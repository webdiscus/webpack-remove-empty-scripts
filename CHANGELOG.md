## 1.0.1 (2022-09-19)
- docs: update readme

## 1.0.0 (2022-09-12)
- BRAKING CHANGE: reverted defaults behavior as in `v0.8.1` - remove empty scripts before other plugins will be called.
  This change is needs for properly work of the vast majority of webpack plugins.

  For compatibility with `v0.8.2 - v0.8.4`, if you have an issue, use new `stage` option with the value:
  ```js
  new RemoveEmptyScriptsPlugin({
    stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
  })
  ```
- feat: added new `stage` option.
  Webpack plugins use different stages for their functionality.
  For properly work other plugins can be specified the `stage` when should be removed empty scripts: before or after processing of other webpack plugins.\
  For example, using `@wordpress/dependency-extraction-webpack-plugin` the empty scripts must be removed `after` processing all plugins.
  Using `webpack-manifest-plugin` the empty scripts must be removed `before` processing other plugins.
- chore: update packages
- test: added the test for using with webpack-manifest-plugin
- docs: update readme

## 0.8.4 (2022-09-08)
- fix: fixed last stable version of ansis in package.json to avoid issues in dependency

## 0.8.3 (2022-09-04)
- docs: update readme

## 0.8.2 (2022-09-04)
- fix: keep extracted wordpress dependencies, #9
- test: refactor tests
- chore: update npm packages

## 0.8.1 (2022-06-14)
- fix: add supports for TypeScript
- chore: update packages
- docs: update readme

## 0.8.0 (2022-04-01)
- feat: added new option `remove` to define custom RegExp for generated assets that must be removed
- chore: update packages

## 0.7.3 (2022-01-30)
- added color verbose output via ANSI color library - ansis
- added the test case for styles imported from javascript 

## 0.7.2 (2021-12-13)
- feat: added new option `enable` to enable / disable the plugin, e.g. by development
- feat: added supports of `RegExp` for option `extensions`
- chore: remove deprecated option `silent`, use `verbose` to show process information (no braking change)
- chore: add GitHub workflow + codecov
- chore: update packages
- docs: update readme

## 0.7.1 (2021-01-14)
- fix: the issue infinite recursion by collect of resources from dependency modules by usage in react app some big components with many thousands dependencies

## 0.7.0 (2020-12-21)
- chore: deprecate the `silent` option, it will be removed on Juni 30, 2021. Use option `verbose: true` to show in console each removed empty file. 
  Defaults, `verbose: false`.
- fix: issue `Maximum call stack size exceeded` in all cases, for example, by usage the webpack setting `optimization.concatenateModules: true` and:
  - import react
  - import redux
  - webpack setting `externals.jquery: 'jQuery'` or other external libs
- fix: the issue if first in webpack entries are a styles and then a scripts

## 0.6.4 (2020-12-19)
- feat: improve the option `ignore`:   
  - it can be the array of string or RegExp
  - added default value of `ignore` as `['/node_modules/']` to ignore resources from `node_modules` path
- fix: the error: `Maximum call stack size exceeded` with webpack setting `optimization.concatenateModules: true`and usage in script imports from `react` and `redux`
- test: added the test case for single style without a scripts in webpack config
- test: added silent mode in tests to suppress output log info in the console
- chore: update packages

## 0.6.3 (2020-10-25)
- fix: BREAKING CHANGE in Webpack 5: no more changes should happen to `Compilation.assets`
- refactor: update code according Webpack 5 API

## 0.6.2 (2020-10-24)
- chore: update packages

## 0.6.1 (2020-10-20)
- The fork of original [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries) (ver. 0.6.0) for support only Webpack 5 and above. 
  The Webpack 4 is no longer supported.

### The changes from original version 0.6.0: 
 
- feat: considers the use hash after the .js and .mjs extension in file format like `.js?[hash]` or `.mjs?[hash]`. 
  The idea and requirement belong to [MatiasMorici](https://github.com/MatiasMorici) from [PR](https://github.com/fqborges/webpack-fix-style-only-entries/pull/27/commits/57eeecbcb85926578770c3845465e4012b02a196) 
- fix: in Webpack 5 fixed deprecation messages:
    - DEP_WEBPACK_CHUNK_HAS_ENTRY_MODULE
    - DEP_WEBPACK_CHUNK_ENTRY_MODULE
    - DEP_WEBPACK_DEPRECATION_ARRAY_TO_SET
    - DEP_WEBPACK_MODULE_INDEX
 
- fix: integration test script for using with Webpack 5
- fix: issue using `terser-webpack-plugin` is generated the needless file `vendor.js.LICENSE.txt` in the production test `vendor+multi-js-entry-css-entry`
- docs: corrected module structure in README.md
- chore: update packages

## 0.6.0 (Oct 13, 2020)
Being overly careful here, this version is not breaking for almost all the existing users. 
It could possibly break in some edge cases, since it changes how modules are collected (from global to one each compilation) 
or if you have a workaround for a working webpack multi configuration.
- BREAKING POSSIBLY: Use a dedicated cache for every compilation (Prevent arbitrary files deletion when using Webpack with multi configurations) (PR [#39](https://github.com/fqborges/webpack-fix-style-only-entries/pull/39))

## 0.5.2 (Oct 07, 2020)
 - feat: supports Webpack 5 using ModuleGraph API (PR [#38](https://github.com/fqborges/webpack-fix-style-only-entries/pull/38))
 - chore: npm audit fix: ([ea9dd7](https://github.com/fqborges/webpack-fix-style-only-entries/commit/ea9dd7bd7ade5b16623064a4850de39545e1e18e))

## 0.5.1 (Jun 13, 2020)
 - fix: Maximum call stack size exceeded (PR [#34](https://github.com/fqborges/webpack-fix-style-only-entries/pull/34))
 - chore: add CHANGELOG ([3e3767](https://github.com/fqborges/webpack-fix-style-only-entries/commit/3e3767d8998a53d807b5d5b10643d05b800aa79a))

## 0.5.0 (May 18, 2020)
 - BREAKING CHANGE: added styl and sass to default extensions ([247a5c](https://github.com/fqborges/webpack-fix-style-only-entries/commit/247a5c9f963e4d7598539056ab3f709b0558b4ec))
 - fix: for [#23](https://github.com/fqborges/webpack-fix-style-only-entries/issues/23) ([37d350](https://github.com/fqborges/webpack-fix-style-only-entries/commit/37d350eec83f49c0b12729a93aa6cf2f96d92d0b))
 - fix: for [#24](https://github.com/fqborges/webpack-fix-style-only-entries/issues/24) ([d92bec](https://github.com/fqborges/webpack-fix-style-only-entries/commit/d92bec4be5fe4b97a8651a9206fa2281ce1424be))
 - chore: add LICENSE.txt ([220e20](https://github.com/fqborges/webpack-fix-style-only-entries/commit/220e20eeb9bc95652a942812a424aadd92ec7d1f))

## 0.4.0 (Sep 8, 2019)
 - feat: add support for module js files (PR [#21](https://github.com/fqborges/webpack-fix-style-only-entries/pull/21))
