<div align="center">
  <img width="120" height="120" src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg">
  <img width="120" height="120" vspace="" hspace="25" src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon-square-big.svg">
  <h1><a href="https://github.com/webdiscus/webpack-remove-empty-scripts">webpack-remove-empty-scripts</a></h1>
</div>

A Webpack plugin to remove empty JavaScript files generated when using style only entries.

## Problem this plugin solves

By default, Webpack creates a JavaScript file for every entry specified in the `entry` option - even when the entry is a style file (like SCSS or CSS).

Example:

```js
module.exports = {
  entry: {
    styles: './styles.scss',
  },
}
```

Output:

```
dist/styles.css
dist/styles.js // <= unwanted empty JS file
```

When using `mini-css-extract-plugin`, CSS is correctly extracted into a separate file, but Webpack still emits an empty JavaScript file for each style-only entry - the [known issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151).

This plugin detects and removes those redundant `.js` files automatically, keeping your output clean.

> **Note**
> 
> This plugin is compatible with `Webpack 5`. 
> For `Webpack 4` use [webpack-fix-style-only-entries](https://github.com/fqborges/webpack-fix-style-only-entries).

## Install
```bash
npm install webpack-remove-empty-scripts --save-dev
```

See the full [documentation](https://github.com/webdiscus/webpack-remove-empty-scripts) on GitHub.
