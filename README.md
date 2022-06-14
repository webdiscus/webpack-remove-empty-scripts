[![npm](https://img.shields.io/npm/v/webpack-remove-empty-scripts/latest?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/webpack-remove-empty-scripts/v/0.8.1)
[![node](https://img.shields.io/node/v/webpack-remove-empty-scripts)](https://nodejs.org)
[![node](https://img.shields.io/github/package-json/dependency-version/webdiscus/webpack-remove-empty-scripts/peer/webpack)](https://webpack.js.org/)
[![codecov](https://codecov.io/gh/webdiscus/webpack-remove-empty-scripts/branch/master/graph/badge.svg)](https://codecov.io/gh/webdiscus/webpack-remove-empty-scripts)
[![node](https://img.shields.io/npm/dm/webpack-remove-empty-scripts)](https://www.npmjs.com/package/webpack-remove-empty-scripts)

# [webpack-remove-empty-scripts](https://www.npmjs.com/package/webpack-remove-empty-scripts)


The plugin removes empty `js` scripts generated when using only the styles like `css` `scss` `sass` `less` `stylus` in the webpack entry.

This is improved fork of original plugin [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries) ver. 0.6.0.\
This fork fixes some deprecation messages and some issues in React. See the details in [changelog](https://github.com/webdiscus/webpack-remove-empty-scripts/blob/master/CHANGELOG.md#061-oct-20-2020).

The plugin support only `Webpack 5`.
For `Webpack 4` use original [plugin](https://github.com/fqborges/webpack-fix-style-only-entries).

## Description of the problem

Webpack generates a js file for each resource defined in a webpack entry.
Some extract plugins use webpack entry to define non-js resources. 
For example, in webpack entry might be defined resources like js, css, scss, html, pug, etc. 
Each resource type needs its own extract plugin and loader. Such a extract plugin should take care of eliminating the phantom js files for non-js resources by self.
But the `mini-css-extract-plugin` not do it.
This plugin fixes this, finds and removes phantom js files for non-js resources.

```js
module.exports = {
  entry: {
    main: './main.js', // the generated `main.js` is what we expect
    styles: './main.scss', // will be generated the expected `styles.css` and the unexpected `styles.js`
  },
  // ...
}
```

You can find more info by the following issues:

 - [extract-text-webpack-plugin issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518)
 - [mini-css-extract-plugin issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151)

---

## Usage with Pug

If you use Pug with this plugin, then you should use the [pug-plugin](https://github.com/webdiscus/pug-plugin).<br>
Pug plugin enable using Pug files directly in webpack entry.<br>
Pug plugin extract JavaScript and CSS from sources used in Pug.

> 💡Using `pug-plugin` the entry-point is the Pug template, not a JS file.

Define Pug files in webpack entry:
```js
const PugPlugin = require('pug-plugin');
module.exports = {
  entry: {
    // all sources of scripts and styles can be used directly in Pug
    // here should be defined Pug templates only
    index: './src/views/index.pug',      // output index.html
    about: './src/views/about/index.pug' // output about.html
    // ..
  },
  plugins: [
    // enable using Pug files in webpack entry
    new PugPlugin({
      modules: [
        // enable extract CSS from source of styles used in Pug
        PugPlugin.extractCss({
          // output filename of styles
          filename: 'assets/css/[name].[contenthash:8].css',
        }),
      ],
    }),
  ],
  // ...
};
```
Use source files of styles and scripts directly in Pug:
```pug
link(href=require('./styles.scss') rel='stylesheet')
script(src=require('./main.js'))
```
Generated HTML contains hashed CSS and JS output filenames:
```html
<link href="/assets/css/styles.05e4dd86.css" rel="stylesheet">
<script src="/assets/js/main.f4b855d8.js"></script>
```

You don't need anymore to use `html-webpack-plugin` `mini-css-extract-plugin` `webpack-remove-empty-scripts` and `pug-loader`.
The single `pug-plugin` replaces all most used functions of these plugins and loaders.
Keep your webpack config clear and clean.

---

## Install
```console
npm install webpack-remove-empty-scripts --save-dev
```

## Usage 
The example of webpack.config.js:
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        'main' : './app/main.js',
        'styles': ['./common/styles.css', './app/styles.css']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
        }),
    ],
};
```

## Options

### `enabled`
Type: `boolean` Default: `true`<br>
Enable / disable the plugin.
**Tip:** Use `disable` for development to improve performance.

### `extensions`
Type: `RegExp` Default: `/\.(css|scss|sass|less|styl)([?].*)?$/` 
Note: the Regexp should have the query part at end `([?].*)?$` to match assets like `style.css?key=val` <br>
Type: `string[]` Default: `['css', 'scss', 'sass', 'less', 'styl']`. It is automatically converted to type `RegExp`. \
Search for empty js files in source files only with these extensions.

### `ignore`
Type: `string | RegExp | string[] | RegExp[]` Default: `null`<br>
Ignore source files.

### `remove`
Type: `RegExp` Default: `/\.(js|mjs)$/`<br>
Remove generated scripts.

### `verbose`
Type: `boolean` Default: `false`<br>
Show process information.

## Recipes

### Show logs to console by development
```JavaScript
const isProduction = process.env.NODE_ENV === 'production';
new RemoveEmptyScriptsPlugin({ verbose: isProduction !== true })
```

### Disable plugin by development to improve performance
```JavaScript
const isProduction = process.env.NODE_ENV === 'production';
new RemoveEmptyScriptsPlugin({ enabled: isProduction === true })
```

### Identify only `.foo` and `.bar` extensions as styles

```JavaScript
new RemoveEmptyScriptsPlugin({ extensions: /\.(foo|bar)$/ })
```

### Usage a javascript entry to styles
Give an especial extension to your file, for example `.css.js`:
```JavaScript
new RemoveEmptyScriptsPlugin({ extensions: /\.(css.js)$/ })
```

### Remove generated scripts `*.js` `*.mjs` except `*.rem.js` `*.rem.mjs`
```JavaScript
new RemoveEmptyScriptsPlugin({ remove: /(?<!\.rem)\.(js|mjs)$/ })
```

### Recursive ignore all js files from directory, for example `my-workers/`
```JavaScript
new RemoveEmptyScriptsPlugin({
  ignore: [
    /my-workers\/.+\.js$/,
  ]
})
```

### Usage webpack-hot-middleware
```JavaScript
new RemoveEmptyScriptsPlugin({
  ignore: [
    'webpack-hot-middleware',
  ]
})
```
[See the test case](https://github.com/webdiscus/webpack-remove-empty-scripts/blob/master/test/cases/css-entry-with-ignored-hmr/webpack.config.js).

## Testing

`npm run test` will run the unit and integration tests.\
`npm run test:coverage` will run the tests with coverage.

## New experimental version

> The `experimental` version `^1.x.x` has **_new improved and fast algorithm_** to detect generated needless empty js files.\
> Please test your project before using it in production.\
> If you have a problem with the new version, please create a [new issue](https://github.com/webdiscus/webpack-remove-empty-scripts/issues).

> ⚠️ The last stable release is `0.8.x` in the branch [`master`](https://github.com/webdiscus/webpack-remove-empty-scripts/tree/master).


## Also See

- more examples of usages see in [test cases](https://github.com/webdiscus/webpack-remove-empty-scripts/tree/master/test/cases)
- [ansis][ansis] - ANSI color styling of text in terminal
- [pug-plugin][pug-plugin]
- [pug-loader][pug-loader]

## License
[ISC](https://github.com/webdiscus/webpack-remove-empty-scripts/blob/master/LICENSE)

<!-- prettier-ignore-start -->
[ansis]: https://github.com/webdiscus/ansis
[pug-plugin]: https://github.com/webdiscus/pug-plugin
[pug-loader]: https://github.com/webdiscus/pug-loader
<!-- prettier-ignore-end -->
