import Path from 'path';

/**
 * Should be stored at the project root. E.g:
 * - /
 * - /eva.config.js
 * - /package.json
 */
const PROJECT_PATH: string = Path.resolve(__dirname, '../../../../');

export default class ProjectService {

  static resolvePath = (path: string): string => {
    if (!path) {
      return './';
    }

    let modulePath = path;

    if (modulePath.startsWith(`.${Path.sep}`) || modulePath.startsWith(`..${Path.sep}`)) {
      modulePath = Path.resolve(Path.dirname(module.parent.filename), modulePath);
    }

    return Path.resolve(PROJECT_PATH, modulePath);
  };

  static requireModule = (path: string): any | null => {
    const modulePath: string = ProjectService.resolvePath(path);

    try {
      return require(modulePath);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND' && ~error.message.indexOf(modulePath)) {
        return null;
      } else {
        console.error(error);
        process.exit(0);
      }
    }
  };

  static hasModule = (path: string): boolean => {
    return ProjectService.requireModule(path) !== null;
  };
}
