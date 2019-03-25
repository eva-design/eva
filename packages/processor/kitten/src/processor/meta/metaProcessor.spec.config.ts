import { schema } from '../../tests';
import {
  MappingProcessor,
  MappingMetaType,
} from '../mapping/mappingProcessor';

const { components: mapping, strict: theme } = schema;

const mappingProcessor: MappingProcessor = new MappingProcessor();
const meta: MappingMetaType[] = mappingProcessor.process(mapping);

export {
  mapping,
  meta,
  theme,
};
