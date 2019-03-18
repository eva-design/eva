import * as fs from 'fs';
import path from 'path';
import {
  ThemeMappingType,
  ThemeStyleType,
} from '@eva/types';
import {
  MappingProcessor,
  MetaProcessor,
  MappingMetaType,
} from '../src/processor';

const packages: string[] = process.argv.splice(2);

if (packages.length === 0) {
  console.error('No specified source mapping package name. Stopping\n');
  process.exit(1);
}

const json = (input: any): string => JSON.stringify(input, null, 2);

const mappingProcessor: MappingProcessor = new MappingProcessor();
const metaProcessor: MetaProcessor = new MetaProcessor();

const rootDir: string = path.resolve('../../../');

packages.forEach(generatePackage);

function generatePackage(name: string) {
  const srcDir: string = path.resolve(rootDir, 'mapping', name);
  const generatedDir: string = path.resolve(rootDir, 'mapping-kitten', name);

  const { default: mapping } = require(srcDir);
  const themeMapping: ThemeMappingType = mapping.theme;

  const meta: MappingMetaType[] = mappingProcessor.process(themeMapping);
  const style: ThemeStyleType = metaProcessor.process({
    mapping: themeMapping,
    meta: meta,
  });

  const indexOutput: string = [
    `import { ThemeMappingType, ThemeStyleType } from '@eva/types';`,
    `export const style: ThemeStyleType = ${json(style)};`,
    `export const mapping: ThemeMappingType = ${json(themeMapping)};`,
  ].join('\n\n');

  const packageOutput: string = json({
    name: `@eva/${name}-kitten`,
    version: '0.0.1',
    license: 'MIT',
    author: 'akveo <contact@akveo.com>',
    homepage: 'https://github.com/akveo/eva#readme',
    repository: 'git+https://github.com/akveo/eva.git',
    bugs: {
      url: 'https://github.com/akveo/eva/issues',
    },
  });

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir);
  }

  fs.writeFileSync(path.resolve(generatedDir, 'index.ts'), indexOutput);
  fs.writeFileSync(path.resolve(generatedDir, 'package.json'), packageOutput);
}
