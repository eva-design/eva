import { default as mapping } from '../../mapping/default';
import {
  MappingProcessor,
  MetaProcessor,
  ThemeMappingType,
} from '../../processor/rk-kit';
import * as fs from 'fs';

const mappingProcessor: MappingProcessor = new MappingProcessor();
const metaProcessor: MetaProcessor = new MetaProcessor();

const themeMapping: ThemeMappingType = metaProcessor.process({
  mapping: mapping,
  meta: mappingProcessor.process(mapping),
});

const output = (mapping: ThemeMappingType): string => {
  return `export default ${JSON.stringify(mapping, null, 2)};`;
};

fs.writeFileSync('../generated.ts', output(themeMapping));
