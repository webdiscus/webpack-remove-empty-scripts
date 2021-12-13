[![npm](https://img.shields.io/npm/v/webpack-remove-empty-scripts/latest?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/webpack-remove-empty-scripts/v/0.7.3)
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

## NEW
> The `experimental` version [`0.8.0`](https://github.com/webdiscus/webpack-remove-empty-scripts) has **_new improved and fast algorithm_** to detect generated needless empty js files.\
> Please test your project before using it in production.\
> If you have a problem with the new version, please create a [new issue](https://github.com/webdiscus/webpack-remove-empty-scripts/issues). 

> :warning: The last stable release is `0.7.3` in the branch [`stable`](https://github.com/webdiscus/webpack-remove-empty-scripts/tree/stable).

## Propose
If you use the `mini-css-extract-plugin` only to extract `css` files from styles defined in webpack entry 
like `scss` `sass` `less` `stylus` then try to use **new entry extract plugin** - [pug-plugin](https://github.com/webdiscus/pug-plugin).

The `pug-plugin`:

- extract HTML and CSS from `pug` `html` `scss` resources defined in `webpack entry`
- doesn't need any fix plugins like `webpack-remove-empty-scripts`, because it doesn't generate empty `js` files
- is very flexible and fast

Improve performance with `pug-plugin`. Using the `pug-plugin` for `pug` `html` `scss` etc in the `webpack entry` no longer requires additional plugins such as:
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- [webpack-remove-empty-scripts](https://github.com/webdiscus/webpack-remove-empty-scripts) (bug fix plugins for `mini-css-extract-plugin`)
- [pug-loader](https://github.com/webdiscus/pug-loader) (this loader is already included in the `pug-plugin`)

For example, `webpack.config.js`
```js
const PugPlugin = require('pug-plugin');
module.exports = {
  entry: {
    'main': 'main.js',
    'styles': 'styles.scss',
    'index': 'index.html', // now is possible define HTML file in entry
    'page01': 'page01.pug', // now is possible define PUG file in entry
    // ...
  },
  plugins: [
    new PugPlugin(), // supports zero config using default webpack output options 
  ]
  // ...
};
```
> The plugin can be used not only for `pug` but also for simply extracting `HTML` or `CSS` from  `webpack entry`, independent of pug usage.

For more examples see the [pug-plugin](https://github.com/webdiscus/pug-plugin).

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
Type: `string[]` Default: `['css', 'scss', 'sass', 'less', 'styl']`. It is automatically converted to type `RegExp`.

### `ignore`
Type: `string | RegExp | string[] | RegExp[]` Default: `null`<br>
Match resource path to be ignored.

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
