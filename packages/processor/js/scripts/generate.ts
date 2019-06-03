import path from 'path';
import {
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'fs';
import { ThemeStyleType } from '@eva-design/dss';
import { SchemaProcessor } from '../src/processor';

const json = (input: any): string => JSON.stringify(input, null, 2);

const schemaProcessor: SchemaProcessor = new SchemaProcessor();

export function generateMappingPackage(source: string) {
  const name: string = path.basename(source);
  const generatedDir: string = path.resolve('packages', 'mapping-kitten', name);

  const { default: schema } = require(source);
  const style: ThemeStyleType = schemaProcessor.process(schema);

  const indexOutput: string = [
    `import { ThemeStyleType } from '@eva-design/dss';`,
    `export const style: ThemeStyleType = ${json(style)};`,
  ].join('\n\n');

  const packageOutput: string = json({
    name: `@eva-design/${name}-kitten`,
    version: '0.0.1',
    license: 'MIT',
    author: 'akveo <contact@akveo.com>',
    homepage: 'https://github.com/eva-design/eva#readme',
    repository: 'git+https://github.com/eva-design/eva.git',
    bugs: {
      url: 'https://github.com/eva-design/eva/issues',
    },
  });

  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir);
  }

  writeFileSync(path.resolve(generatedDir, 'index.ts'), indexOutput);
  writeFileSync(path.resolve(generatedDir, 'package.json'), packageOutput);
}
