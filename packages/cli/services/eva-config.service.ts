import LogService from './log.service';
import ProjectService from './project.service';

/**
 * Defines the `eva.config.js` structure
 *
 * @param {EvaMappingPackageName} evaPackage - the name of the eva package.
 * @param {string} customMappingPath - path to custom mapping.
 *
 * @example eva.config.js
 * ```
 * module.exports = {
 *   evaPackage: '@eva-design/eva',
 *   customMappingPath: './custom-mapping.json',
 * };
 * ```
 */
export interface EvaConfig {
  evaPackage: EvaMappingPackageName;
  customMappingPath?: string;
}

export type EvaMappingPackageName = '@eva-design/eva' | '@eva-design/material';

export default class EvaConfigService {

  static CONFIG_FILE_NAME = 'eva.config.js';

  static MAPPING_PACKAGE_NAMES: EvaMappingPackageName[] = [
    '@eva-design/eva',
    '@eva-design/material',
  ];

  static getEvaConfig = (): EvaConfig | null => {
    return ProjectService.requireModule(EvaConfigService.CONFIG_FILE_NAME);
  };

  static createDefaultConfig = (evaPackage: EvaMappingPackageName): EvaConfig => {
    return { evaPackage: evaPackage };
  };

  static validateConfigOrExit = (config: EvaConfig): void => {
    if (!config.evaPackage || !EvaConfigService.isValidEvaPackageName(config.evaPackage)) {
      LogService.error(
        `There is no eva package specified in ${EvaConfigService.CONFIG_FILE_NAME}`,
        `Consider setting "mappingPackage" property of ${EvaConfigService.CONFIG_FILE_NAME}`,
        'to one of the following values:',
        '',
        ...EvaConfigService.MAPPING_PACKAGE_NAMES,
      );
      process.exit(0);
    }

    const isEvaPackageInstalled = ProjectService.hasModule(`node_modules/${config.evaPackage}`);

    if (!isEvaPackageInstalled) {
      LogService.error(
        `${EvaConfigService.CONFIG_FILE_NAME} has ${config.evaPackage} specified`,
        'but it seems to be not installed',
        '',
        `Consider installing ${config.evaPackage} and running this command again.`,
      );
      process.exit(0);
    }
  };

  private static isValidEvaPackageName = (name: string): boolean => {
    return EvaConfigService.MAPPING_PACKAGE_NAMES.includes(name as EvaMappingPackageName);
  };
}
