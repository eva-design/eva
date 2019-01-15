const { defaults: tsJestConfig } = require('ts-jest/presets');

module.exports = {
  ...tsJestConfig,
  transform: {
    ...tsJestConfig.transform,
    '\\.js$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: './tsconfig.jest.json',
    },
  },
  cacheDirectory: './dist/jest/cache',
  coverageDirectory: './dist/jest/coverage',
  snapshotResolver: '<rootDir>/jest.config.snapshot',
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules'
  ]
};
