# Release

To start a new release (publish the framework packages on NPM) you need:

1. Setup node 10 environment (the latest is v10.24.1 with npm 6.14.12). Consider using a node manager, e.g. [n](https://github.com/tj/n).
2. Create a new release branch called like `release/v1.0.2`
3. `npm run release:validate` - this will check linter issues and tests.
4. `npm run release:prepare` - this will create ready for publishing packages in `./dist`.
5. MANUALLY update a version in main ./package.json to a new one.
6. `npm run version:bump` - this will update versions of `dss`, `eva`, `processor` packages.
7. Update version in `package-lock.json`.
8. `npm run version:changelog` - this will update `CHANGELOG.md` file.
9. Fix/expand changelog manually.
10. Push the branch, create PR, approve - merge.
11. Pull the upstream (master).
13. `npm run release` - run prepare & validate and finally publish the packages to NPM.
14. Create and push git tag. `git tag v1.0.2 && git push origin v1.0.2`
15. Create release on github.
