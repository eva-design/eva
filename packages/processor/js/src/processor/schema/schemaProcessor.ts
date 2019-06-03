import { Processor } from '../processor';
import {
  MappingProcessor,
  MappingMetaType,
} from '../mapping/mappingProcessor';
import { MetaProcessor } from '../meta/metaProcessor';
import {
  SchemaType,
  ThemeStyleType,
} from '@eva-design/dss';

export class SchemaProcessor implements Processor<SchemaType, ThemeStyleType> {

  private mappingProcessor: MappingProcessor = new MappingProcessor();
  private metaProcessor: MetaProcessor = new MetaProcessor();

  public process(params: SchemaType): ThemeStyleType {
    const { components: themeMapping, strict: strictTheme } = params;

    const meta: MappingMetaType[] = this.mappingProcessor.process(themeMapping);

    return this.metaProcessor.process({
      mapping: themeMapping,
      meta: meta,
      theme: strictTheme,
    });
  }
}
