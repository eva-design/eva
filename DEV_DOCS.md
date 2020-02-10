- [Release](#release)

# Release

0. For major version, search for `@breaking-change` to make sure all breaking changes are covered.

To start a new release (publish the framework packages on NPM) you need:

1. Create a new release branch with template `release/vX.X.X`
2. Run tests: `npm run lint && npm run test`
3. MANUALLY update a version in main ./package.json to a new one
4. Generate changelog: `npm run bump-version`
5. Fix/expand changelog manually
6. Update documentation (e.g [DEV_DOCS.md](./DEV_DOCS.md)) files if needed
7. Push the branch, create PR, approve - merge
8. Pull the upstream (master or another version branch (e.g. 4.0.1, next))   
9. Publish documentation: `npm run publish-docs`
10. Publish framework packages: `npm run publish-packages`
11. Create and push [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) with template `(vX.X.X)`
12. Create release on GitHub for the tag
