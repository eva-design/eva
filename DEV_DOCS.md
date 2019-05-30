# Release

To start a new release (publish the framework packages on NPM) you need:

1. Create a new release branch called `release:v1.0.2`
2. `npm run release:validate` - this will check linter issues and tests.
3. `npm run release:prepare` - this will create ready for publishing packages in `./dist`.
4. MANUALLY update a version in main ./package.json to a new one.
5. `npm run version:bump` - this will update versions of `dss`, `eva`, `processor` packages.
6. Update version in `package-lock.json` and `packages/processor/package-lock.json`.
7. `npm run version:changelog` - this will update `CHANGELOG.md` file.
8. fix/expand changelog manually
9. push the branch, create PR, approve - merge
10. pull the upstream (master)   
11. `npm run release` - run prepare & validate and finally publish the packages to NPM (use `--tag=next` for upcoming release)
12. create and push git tag
13. create release on github
