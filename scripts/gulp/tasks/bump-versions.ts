import {
  dest,
  src,
  task,
} from 'gulp';

const fs = require('fs');
const through = require('through2');

const VERSION_APPENDIX = process.env.EVA_VERSION_APPENDIX;
const VERSION = process.env.EVA_VERSION || require('../../../package.json').version +
  (VERSION_APPENDIX ? '-' + VERSION_APPENDIX : '');
const FRAMEWORK_ROOT = './packages';

task('version', () => {
  return fs.readdirSync(FRAMEWORK_ROOT)
    .map(createFullPathToPackageJson)
    .map(bumpVersionAndEvaPeers);
});

function createFullPathToPackageJson(pkgName: string): string {
  return `${FRAMEWORK_ROOT}/${pkgName}/package.json`;
}

function bumpVersionAndEvaPeers(pkgPath: string) {
  return src(pkgPath, { base: './' })
    .pipe(through.obj(function (file, encoding, callback) {
      const pkgJson = JSON.parse(file.contents.toString(encoding));

      pkgJson.version = VERSION;
      if (pkgJson.peerDependencies) {
        bumpVersionOfEvaDesignDependencies(pkgJson, 'peerDependencies');
      }
      if (pkgJson.devDependencies) {
        bumpVersionOfEvaDesignDependencies(pkgJson, 'devDependencies');
      }
      file.contents = Buffer.from(JSON.stringify(pkgJson, null, 2) + '\n');
      callback(null, file);
    }))
    .pipe(dest('./'));
}

function bumpVersionOfEvaDesignDependencies(pkgJson, dependencies: string) {
  Object.keys(pkgJson[dependencies]).filter(isEvaDependency).forEach(dep => {
    return pkgJson[dependencies][dep] = VERSION;
  });
}

function isEvaDependency(dep): boolean {
  return dep.includes('@eva-design');
}
