import { Processor } from '../processor';
import {
  createAllStyles,
  toObject,
  ThemeMappingType,
  StyleMappingType,
  IndexSignatureBase,
} from '../../service';
import { MappingMetaType } from '../type';

export interface MappingProcessorParamsType {
  mapping: ThemeMappingType;
  meta: MappingMetaType[];
}

export class MetaProcessor implements Processor<MappingProcessorParamsType, ThemeMappingType> {

  process(params: MappingProcessorParamsType): ThemeMappingType {
    const entries = params.meta.map((value: MappingMetaType) => {
      return this.processComponentMeta(params.mapping, value);
    });

    return toObject(entries);
  }

  private processComponentMeta(mapping: ThemeMappingType, value: MappingMetaType): [string, IndexSignatureBase] {
    const {name: entryKey, appearance, variants, states} = value;
    const entryValue: StyleMappingType[] = createAllStyles(
      mapping,
      entryKey,
      appearance,
      variants,
      states,
    );

    return [entryKey, toObject(entryValue)];
  }
}
