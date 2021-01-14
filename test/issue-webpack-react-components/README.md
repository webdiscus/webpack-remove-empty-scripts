# Fix the issue by concatenateModules = true in react application

Some big react components, such as `@material-ui/data-grid` from `material-ui.com` has more thousands dependencies (over 4000).
In any combination of imports from same components come out the issue: _infinite recursion by collect of resources from dependency modules_.

### Manual test (issue is fixed)

Initial, run `npm install` to install dependencies.

Build in production mode with webpack config `optimization.concatenateModules: true`

run `./webpack-build.sh`


Build in development mode with webpack config `optimization.concatenateModules: true`

run `./webpack-build-dev.sh`