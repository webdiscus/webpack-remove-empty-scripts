const plugins = [
  ['@babel/plugin-proposal-class-properties'],
  ['@babel/plugin-transform-runtime'], // needed since there is an error with injected react (in change-fonts at least)
  [
    'babel-plugin-styled-components',
    {
      pure: true,
    },
  ],
]

module.exports = api =>
  api.env('production')
    ? {
        presets: [
          [
            // Only add polyfill in production since
            // most use a recent browser when developing
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              //debug: true,
              shippedProposals: true,
              bugfixes: true,
              targets: '>2%',
            },
          ],
          '@babel/preset-react',
        ],
        plugins,
      }
    : {
        // Only transforms new dev syntax like optional chaining
        // or nullish coalescing
        presets: ['@babel/env', '@babel/preset-react'],
        plugins,
      }
