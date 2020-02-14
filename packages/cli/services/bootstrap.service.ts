import { SchemaProcessor } from '@eva-design/processor';
import Fs from 'fs';
import LodashMerge from 'lodash.merge';
import EvaConfigService, {
  EvaConfig,
  EvaMappingPackageName,
} from './eva-config.service';
import LogService from './log.service';
import ProjectService from './project.service';

const OUTPUT_STYLES_VAR_NAME: string = 'styles';
const OUTPUT_STYLES_FILE_NAME: string = 'generated.json';

const schemaProcessor = new SchemaProcessor();

/**
 * Generates styles for `@eva-design/*` package specified in `eva.config.js`
 *
 * @see EvaConfig
 *
 * 1. Finds installed `@eva-design/*` packages.
 * Will exit process if there is no packages valid mapping installed.
 *
 * @see EvaConfigService.MAPPING_PACKAGE_NAMES
 *
 * 2. Checks if the `eva.config.js` exists in the project root and creates default if there is no.
 * The default `evaPackage` will be set to first valid mapping package found in the project node_modules.
 *
 * 3. Validates `eva.config.js` by checking if `evaPackage` is specified and is one of the valid mapping packages.
 * Will exit process if it is not valid.
 *
 * Default `eva.config.js` will include the first mapping package found in the project node_modules.
 *
 * E.g, if `evaPackage` is `@eva-design/eva`:
 * ```js
 * module.exports = { evaPackage: '@eva-design/eva' };
 * ```
 *
 * 4. Generates styles for specified `evaPackage` and stores it in `output.json` in the package directory.
 *
 * E.g, if `evaPackage` is `@eva-design/eva`:
 * The result will be stored at `./node_modules/@eva-design/eva/output.json`
 *
 * @example usage within nodejs project:
 *
 * 1. Install `@eva-design/cli` package as dev dependency: `npm i -D @eva-design/cli`
 * 2. Add the eva binary to package.json scripts
 * ```json
 * {
 *   "scripts": {
 *     "eva": "eva"
 *   }
 * }
 * 3. Run with `npm run eva bootstrap`
 */
export default class BootstrapService {

  static run = (): void => {
    const [evaPackage] = BootstrapService.findInstalledEvaPackagesOrExit();

    const evaConfig = EvaConfigService.getEvaConfig();

    if (!evaConfig) {
      LogService.info(`There is no ${EvaConfigService.CONFIG_FILE_NAME}, creating default`);
      BootstrapService.createDefaultConfig(evaPackage, () => {
        LogService.success('Success. Bootstrapping');
        BootstrapService.run();
      });

      return;
    }

    LogService.info(`Making sure your project setup correctly`);
    EvaConfigService.validateConfigOrExit(evaConfig);

    BootstrapService.createOutputStyles(evaConfig);
    LogService.success(`Successfully integrated with ${evaConfig.evaPackage}`);
  };

  private static findInstalledEvaPackagesOrExit = (): EvaMappingPackageName[] => {
    const installedEvaPackages: EvaMappingPackageName[] = [];

    EvaConfigService.MAPPING_PACKAGE_NAMES.forEach((packageName: EvaMappingPackageName) => {
      const isEvaPackageInstalled = ProjectService.hasModule(`node_modules/${packageName}`);

      if (isEvaPackageInstalled) {
        installedEvaPackages.push(packageName);
      }
    });

    if (installedEvaPackages.length === 0) {
      LogService.error(
        'This project has no Eva packages installed.',
        '',
        'Consider installing one of the following packages:',
        '',
        ...EvaConfigService.MAPPING_PACKAGE_NAMES,
        '',
        'And running this command again.',
      );
      process.exit(0);
    }

    return installedEvaPackages;
  };

  private static createDefaultConfig = (evaPackage: EvaMappingPackageName, callbackFn): void => {
    const evaConfig = EvaConfigService.createDefaultConfig(evaPackage);
    const outputConfig = `module.exports = ${JSON.stringify(evaConfig, null, 2)};`;

    const evaConfigPath: string = ProjectService.resolvePath(EvaConfigService.CONFIG_FILE_NAME);
    Fs.writeFile(evaConfigPath, outputConfig, callbackFn);
  };

  private static createOutputStyles = (config: EvaConfig): void => {
    const evaMapping = ProjectService.requireModule(
      `node_modules/${config.evaPackage}/mapping.json`,
    );

    const projectMapping = ProjectService.requireModule(config.customMappingPath);
    const outputMapping = LodashMerge({}, evaMapping, projectMapping);
    const outputStyles = schemaProcessor.process(outputMapping);

    const outputStylesPath = ProjectService.resolvePath(
      `node_modules/${config.evaPackage}/${OUTPUT_STYLES_FILE_NAME}`,
    );

    Fs.writeFileSync(
      outputStylesPath,
      JSON.stringify(outputStyles, null, 2),
    );

    const outputIndexPath = ProjectService.resolvePath(
      `node_modules/${config.evaPackage}/index.js`,
    );

    Fs.appendFileSync(
      outputIndexPath,
      `\nexports.${OUTPUT_STYLES_VAR_NAME} = require('./${OUTPUT_STYLES_FILE_NAME}');`,
    );
  };
}

