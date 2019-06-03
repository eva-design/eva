# Release

To start a new release (publish the framework packages on NPM) you need:

1. Create a new release branch called `release:v1.0.2`
2. `npm run release:validate` - this will check linter issues and tests.
3. `npm run release:prepare` - this will create ready for publishing packages in `./dist`.
4. MANUALLY update a version in main ./package.json to a new one.
5. `npm run version:bump` - this will update versions of `dss`, `eva`, `processor` packages.
6. Update version in `package-lock.json`.
7. Update devDependency `@eva-design/dss` version under the `processor`.
8. `npm run version:changelog` - this will update `CHANGELOG.md` file.
9. Fix/expand changelog manually.
10. Push the branch, create PR, approve - merge.
11. Pull the upstream (master).
12. `npm run release` - run prepare & validate and finally publish the packages to NPM.
13. Create and push git tag.
14. Create release on github.
