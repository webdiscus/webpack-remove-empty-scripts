import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import { minify } from 'terser';

// Helpers
//
// - Display the size of a directory's content:
//   find ./dist -type f -exec stat -f"%z" {} + | awk '{s+=$1} END {print s}'

// https://github.com/terser/terser#compress-options
const terserOptions = (ecma) => ({
  ecma,
  compress: false, // do not perform any compression
  mangle: false,   // do not mangle variable names
  format: {
    comments: false, // remove all comments
    beautify: true,   // keep code readable
    indent_level: 1, // use single space as base
  }
});

/**
 * Convert leading spaces to tabs.
 *
 * @return {{name: string, generateBundle(*, *): void}}
 */
const indentToTabsPlugin = function () {
  return {
    name: 'indent-to-tabs',

    generateBundle(options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          // replace leading spaces in every line with tabs
          file.code = file.code.replace(/^ +/gm, (match) => '\t'.repeat(match.length));
        }
      }
    },
  };
}

function buildConfig({ ecma }) {
  return {
    input: 'src/index.js',
    output: {
      file: `dist/index.js`,
      format: 'cjs',
      strict: false,
      esModule: false,
      exports: 'auto',
    },
    // not to bundle these modules
    external: [
      'path',
      'ansis',
    ],
    plugins: [
      resolve(),
      commonjs(),
      terser(terserOptions(ecma)),
      copy({
        targets: [
          {
            src: 'src/index.js',
            dest: `dist/`,
            transform: async (contents) => (
              await minify(
                contents.toString(),
                { ecma }
              )
            ).code,
          },
          {
            src: 'src/index.d.ts',
            dest: `dist/`,
            rename: 'index.d.ts',
          },
          { src: `package.npm.json`, dest: `dist/`, rename: 'package.json' },
          { src: `README.npm.md`, dest: `dist/`, rename: 'README.md' },
          { src: 'LICENSE', dest: `dist/` },
        ],
      }),
      indentToTabsPlugin(),
    ],
  };
}

export default [
  buildConfig({ ecma: 2018 }),
];
