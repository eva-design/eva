import {
  task,
} from 'gulp';
const fs = require('fs');
import { mapping } from '../../../packages/eva';
import { light } from '../../../packages/eva';
import { generateMappingTypes, generateThemeTypes } from '../../../packages/processor/js/scripts/generateTypes';

task('generateTypes', () => {
  const mappingFileContent = generateMappingTypes(mapping);
  fs.writeFileSync('./dist/eva/mapping.types.ts', mappingFileContent);

  const themeFileContent = generateThemeTypes(light);
  fs.writeFileSync('./dist/eva/theme.types.ts', themeFileContent);
});
