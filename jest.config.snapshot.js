module.exports = {
  resolveSnapshotPath: (path, extension) => {
    return `${path}${extension}`;
  },
  resolveTestPath: (path, extension) => {
    return path.slice(0, -extension.length);
  },
  testPathForConsistencyCheck: 'some/example.spec.ts',
};
