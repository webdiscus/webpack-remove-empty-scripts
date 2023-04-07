<div align="center">
  <img width="120" height="120" src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg">
  <a href="https://webpack.js.org/">
    <img width="120" height="120" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  </a>
  <h1><a href="https://github.com/webdiscus/webpack-remove-empty-scripts">webpack-remove-empty-scripts</a></h1>
  <div>The plugin removes empty JavaScript files generated when using only styles in Webpack entry.</div>
</div>

---
[![npm](https://img.shields.io/npm/v/webpack-remove-empty-scripts?logo=npm&color=brightgreen "npm package")](https://www.npmjs.com/package/webpack-remove-empty-scripts "download npm package")
[![node](https://img.shields.io/node/v/webpack-remove-empty-scripts)](https://nodejs.org)
[![node](https://img.shields.io/github/package-json/dependency-version/webdiscus/webpack-remove-empty-scripts/peer/webpack)](https://webpack.js.org/)
[![Test](https://github.com/webdiscus/webpack-remove-empty-scripts/actions/workflows/test.yml/badge.svg)](https://github.com/webdiscus/webpack-remove-empty-scripts/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/webdiscus/webpack-remove-empty-scripts/branch/master/graph/badge.svg)](https://codecov.io/gh/webdiscus/webpack-remove-empty-scripts)
[![node](https://img.shields.io/npm/dm/webpack-remove-empty-scripts)](https://www.npmjs.com/package/webpack-remove-empty-scripts)

Webpack generates a JS file for each resource defined in Webpack entry.\
The `mini-css-extract-plugin` extract CSS, but not eliminate a generated empty js file.\
See the [mini-css-extract-plugin issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151).
```js
module.exports = {
  entry: {
    styles: './styles.scss', // generates expected `styles.css` and unexpected `styles.js`
  },
}
```
This plugin removes an unexpected empty JS file.


> **Note**
> 
> This plugin is compatible with `Webpack 5` only. For `Webpack 4` use [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries).

---

## Usage with html-webpack-plugin

> **Warning**
> 
> The `webpack-remove-empty-scripts` is the `Emergency Fix` for the `bug` in `mini-css-extract-plugin`.
>
> ✅ It is recommended to use the new powerful [html-bundler-webpack-plugin][html-bundler-webpack-plugin] instead of:
> 
> - html-webpack-plugin
> - mini-css-extract-plugin
> - webpack-remove-empty-scripts

### Highlights of html-bundler-webpack-plugin

- **Prevents generating unexpected empty JS files.**
- An [entry point](https://github.com/webdiscus/html-bundler-webpack-plugin#option-entry) is an HTML template.
- Source **scripts** and **styles** can be specified directly in HTML using `<script>` and `<link>`.
- Extracts JS and CSS from their sources specified in HTML.
- Resolving [source](https://github.com/webdiscus/html-bundler-webpack-plugin#loader-option-sources) assets specified in standard attributes `href` `src` `srcset` etc.
- Inline [JS](https://github.com/webdiscus/html-bundler-webpack-plugin#recipe-inline-js), [CSS](https://github.com/webdiscus/html-bundler-webpack-plugin#recipe-inline-css), [SVG](https://github.com/webdiscus/html-bundler-webpack-plugin#recipe-inline-image), [PNG](https://github.com/webdiscus/html-bundler-webpack-plugin#recipe-inline-image) without additional plugins and loaders.
- Support for [template engines](https://github.com/webdiscus/html-bundler-webpack-plugin#recipe-template-engine) such as Eta, EJS, Handlebars, Nunjucks, LiquidJS and others.



### Simple usage example

Add source scripts and styles directly to HTML:

```html
<html>
<head>
  <!-- specify source styles -->
  <link href="./style.scss" rel="stylesheet">
  <!-- specify source scripts here and/or in body -->
  <script src="./main.js" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
  <!-- specify source images -->
  <img src="./logo.png">
</body>
</html>
```

The generated HTML contains the output filenames of the processed assets:

```html
<html>
<head>
  <link href="assets/css/style.05e4dd86.css" rel="stylesheet">
  <script src="assets/js/main.f4b855d8.js" defer="defer"></script>
</head>
<body>
  <h1>Hello World!</h1>
  <img src="assets/img/logo.58b43bd8.png">
</body>
</html>
```

Add the HTML templates in the `entry` option:

```js
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlBundlerPlugin({
      // define a relative or absolute path to template pages
      entry: 'src/views/',
      // OR define templates manually
      entry: {
        index: 'src/views/home.html', // => dist/index.html
        'news/sport': 'src/views/news/sport/index.html', // => dist/news/sport.html
      },
    }),
  ],
  // ... loaders for styles, images, etc.
};
```

## Usage with Pug

If you use Pug with this plugin, then you should use the [pug-plugin](https://github.com/webdiscus/pug-plugin).<br>
The Pug plugin works like [html-bundler-webpack-plugin][html-bundler-webpack-plugin] but for Pug templates.

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
---

## Options

### `enabled`
Type: `boolean` Default: `true`<br>
Enable / disable the plugin.
**Tip:** Use `disable` for development to improve performance.

### `stage`
Type: `number`<br>
Values:
- `RemoveEmptyScriptsPlugin.STAGE_BEFORE_PROCESS_PLUGINS` (default)\
  Remove empty scripts `before` processing other plugins.\
  For example, exact this stage needs for properly work of the `webpack-manifest-plugin`.
- `RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS`\
  Remove empty scripts `after` processing all other plugins.\
  For example, exact this stage needs for properly work of the `@wordpress/dependency-extraction-webpack-plugin`.

Webpack plugins use different stages for their functionality.
For properly work other plugins can be specified the `stage` when should be removed empty scripts: before or after processing of other Webpack plugins.

See [usage example](#usage-stage-optoion).

> **Warning**
> 
> Because `webpack-manifest-plugin` and `@wordpress/dependency-extraction-webpack-plugin` needs different stages
> both plugins can't be used together with `RemoveEmptyScriptsPlugin` at one configuration.

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
```js
const isProduction = process.env.NODE_ENV === 'production';
new RemoveEmptyScriptsPlugin({ verbose: isProduction !== true })
```

### Disable plugin by development to improve performance
```js
const isProduction = process.env.NODE_ENV === 'production';
new RemoveEmptyScriptsPlugin({ enabled: isProduction === true })
```

<a id="usage-stage-optoion" name="usage-stage-optoion" href="#usage-stage-optoion"></a>
### Specify stage for properly work some plugins
For example, using `@wordpress/dependency-extraction-webpack-plugin` the empty scripts must be removed `after` processing all plugins.

```js
const path = require('path');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  output: {
    path: path.join(__dirname, 'public'),
  },
  entry: {
    'main': './src/sass/main.scss',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DependencyExtractionWebpackPlugin(),
    new RemoveEmptyScriptsPlugin({
      stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS, // <- use this option
    }),
  ],
};
```

### Identify only `.foo` and `.bar` extensions as styles

```js
new RemoveEmptyScriptsPlugin({ extensions: /\.(foo|bar)$/ })
```

### Usage a javascript entry to styles
Give an especial extension to your file, for example `.css.js`:
```js
new RemoveEmptyScriptsPlugin({ extensions: /\.(css.js)$/ })
```

### Remove generated scripts `*.js` `*.mjs` except `*.rem.js` `*.rem.mjs`
```js
new RemoveEmptyScriptsPlugin({ remove: /(?<!\.rem)\.(js|mjs)$/ })
```

### Recursive ignore all js files from directory, for example `my-workers/`
```js
new RemoveEmptyScriptsPlugin({
  ignore: [
    /my-workers\/.+\.js$/,
  ]
})
```

### Usage webpack-hot-middleware
```js
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


## Who use this plugin

<a href='https://github.com/mozilla'>
  <img src='https://avatars.githubusercontent.com/u/131524?s=42&v=4' title='Mozilla'>
</a>
<a href='https://github.com/pypi/warehouse'>
  <img src="https://avatars.githubusercontent.com/u/2964877?s=42&v=4" title='PyPi'>
</a>
<a href='https://github.com/preactjs'>
  <img src="https://avatars.githubusercontent.com/u/26872990?s=42&v=4" title='Preact'>
</a>
<a href='https://github.com/rails/jsbundling-rails/blob/main/docs/switch_from_webpacker.md'>
  <img src="https://avatars.githubusercontent.com/u/4223?s=42&v=4" title='Rails'>
</a>
<a href='https://www.cisco.com/c/dam/en_us/about/doing_business/open_source/docs/slido-test-2206-1655452418.pdf'>
  <img src='https://avatars.githubusercontent.com/u/1376999?s=42&v=4' title='Cisco'>
</a>
<a href='https://github.com/jenkinsci'>
  <img src='https://avatars.githubusercontent.com/u/107424?s=42&v=4' title='Jenkins'>
</a>
<a href='https://github.com/coinbase'>
  <img src='https://avatars.githubusercontent.com/u/1885080?s=42&v=4' title='Coinbase'>
</a>
<a href='https://github.com/PrestaShop'>
  <img src='https://avatars.githubusercontent.com/u/2815696?s=42&v=4' title='PrestaShop'>
</a>
<a href='https://github.com/getsentry'>
  <img src='https://avatars.githubusercontent.com/u/1396951?s=42&v=4' title='Sentry'>
</a>
<a href='https://github.com/wikimedia'>
  <img src='https://avatars.githubusercontent.com/u/56668?s=42&v=4' title='Wikimedia'>
</a>
<a href='https://github.com/standardnotes'>
  <img src='https://avatars.githubusercontent.com/u/24537496?s=42&v=4' title='Standard Notes'>
</a>
<a href='https://github.com/woocommerce'>
  <img src='https://avatars.githubusercontent.com/u/473596?s=42&v=4' title='WooCommerce'>
</a>
<a href='https://github.com/roots'>
  <img src='https://avatars.githubusercontent.com/u/4986074?s=42&v=4' title='Roots'>
</a>
<a href='https://github.com/ampproject'>
  <img src='https://avatars.githubusercontent.com/u/14114390?s=42&v=4' title='AMP'>
</a>
<a href='https://github.com/awesomemotive'>
  <img src='https://avatars.githubusercontent.com/u/8514352?s=42&v=4' title='Awesome Motive'>
</a>
<a href='https://github.com/10up'>
  <img src='https://avatars.githubusercontent.com/u/3358927?s=42&v=4' title='10up'>
</a>
<a href='https://github.com/collab-project'>
  <img src='https://avatars.githubusercontent.com/u/347599?s=42&v=4' title='Collab project'>
</a>
<a href='https://github.com/jspsych'>
  <img src='https://avatars.githubusercontent.com/u/16901698?s=42&v=4' title='jsPsych'>
</a>
<a href='https://github.com/grandnode'>
  <img src='https://avatars.githubusercontent.com/u/16118376?s=42&v=4' title='GrandNode'>
</a>
<a href='https://github.com/TheOdinProject'>
  <img src='https://avatars.githubusercontent.com/u/4441966?s=42&v=4' title='The Odin Project'>
</a>
<a href='https://github.com/helsingborg-stad'>
  <img src='https://avatars.githubusercontent.com/u/12846276?s=42&v=4' title='Helsingborg Stad'>
</a>
<a href='https://github.com/City-of-Helsinki'>
  <img src='https://avatars.githubusercontent.com/u/1875564?s=42&v=4' title='City of Helsinki'>
</a>

## Also See

- [ansis][ansis] - The Node.js library for ANSI color styling of text in terminal.
- [html-bundler-webpack-plugin][html-bundler-webpack-plugin] - HTML bundler plugin for webpack handels a template as an entry point, extracts CSS and JS from their sources specified in HTML, supports template engines like Eta, EJS, Handlebars, Nunjucks and others "out of the box".
- [pug-plugin][pug-plugin] - plugin for Webpack compiles Pug files to HTML, extracts CSS and JS from their sources specified in Pug.
- [pug-loader][pug-loader] - loader for Webpack renders Pug to HTML or template function. Optimized for using with Vue.

## License
[ISC](https://github.com/webdiscus/webpack-remove-empty-scripts/blob/master/LICENSE)

<!-- prettier-ignore-start -->
[ansis]: https://github.com/webdiscus/ansis
[pug-plugin]: https://github.com/webdiscus/pug-plugin
[pug-loader]: https://github.com/webdiscus/pug-loader
[html-bundler-webpack-plugin]: https://github.com/webdiscus/html-bundler-webpack-plugin
<!-- prettier-ignore-end -->
