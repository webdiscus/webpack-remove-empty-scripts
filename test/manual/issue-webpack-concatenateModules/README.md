# Fix the issue by concatenateModules = true 

Any module from `compilation.chunkGraph.getChunkEntryModulesIterable()` has the structure,
where not exist a `name` or a `require`:
```JSON
{
    "weak": false,
    "optional": false,
    "loc": {"start": {"line": 13, "column": 9}, "end": {"line": 13, "column": 15}},
    "decorator": "__webpack_require__.hmd",
    "allowExportsAccess": false
}
```

If occur like it structure, then not analyse for a resource, skip it.

### Manual test (issue is fixed)

Initial, run `npm install` to install dependencies.

Build in production mode, default webpack config has `optimization.concatenateModules: true` 

run `./webpack-build.sh`


Build in development mode, default webpack config has `optimization.concatenateModules: false`

run `./webpack-build-dev.sh`