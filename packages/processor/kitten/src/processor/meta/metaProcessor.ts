import {
  ThemeMapType,
  ComponentMapMetaType,
  ThemeMappingType,
  StyleMappingType,
  IndexSignatureBase,
  ComponentMappingType,
  MappingMetaType,
} from '@eva/common';
import { Processor } from '../processor';
import {
  safe,
  toObject,
  createAllStyles,
  getComponentMapping,
} from '../../service';

export interface MappingProcessorParamsType {
  mapping: ThemeMappingType;
  meta: MappingMetaType[];
}

export class MetaProcessor implements Processor<MappingProcessorParamsType, ThemeMapType> {

  process(params: MappingProcessorParamsType): ThemeMapType {
    const entries = params.meta.map((value: MappingMetaType) => {
      return this.processComponentMeta(params.mapping, value);
    });

    return toObject(entries);
  }

  private processComponentMeta(mapping: ThemeMappingType, value: MappingMetaType): [string, IndexSignatureBase] {
    const { name: entryKey, appearance, variants, states } = value;
    const entryValue: StyleMappingType[] = createAllStyles(
      mapping,
      entryKey,
      appearance,
      variants,
      states,
    );
    const componentInfo: IndexSignatureBase = {
      meta: this.getComponentMapMeta(mapping, entryKey),
      ...toObject(entryValue),
    };

    return [entryKey, componentInfo];
  }

  // This method will require changes as the mapping meta changes.
  private getComponentMapMeta(mapping: ThemeMappingType, component: string): ComponentMapMetaType {
    const componentMapping: ComponentMappingType = getComponentMapping(mapping, component);

    return {
      variants: safe(componentMapping, () => componentMapping.meta.variants),
      states: safe(componentMapping, () => componentMapping.meta.states),
    };
  }
}
