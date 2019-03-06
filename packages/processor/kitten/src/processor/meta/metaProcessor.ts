import {
  ThemeStyleType,
  ComponentMapMetaType,
  ThemeMappingType,
  ComponentThemedStyleType,
  ThemedStyleType,
} from '@eva/types';
import { MappingMetaType } from '@eva/processor/kitten';
import { Processor } from '../processor';
import {
  toObject,
  createAllStyles,
  getComponentMapping,
} from '../../service';

export interface MappingProcessorParamsType {
  mapping: ThemeMappingType;
  meta: MappingMetaType[];
}

export class MetaProcessor implements Processor<MappingProcessorParamsType, ThemeStyleType> {

  process(params: MappingProcessorParamsType): ThemeStyleType {
    const entries = params.meta.map((value: MappingMetaType) => {
      return this.processComponentMeta(params.mapping, value);
    });

    return toObject(entries);
  }

  private processComponentMeta(mapping: ThemeMappingType, value: MappingMetaType): [string, ComponentThemedStyleType] {
    const { name: entryKey, appearance, variants, states } = value;
    const entryValue: [string, ThemedStyleType][] = createAllStyles(
      mapping,
      entryKey,
      appearance,
      variants,
      states,
    );

    return [entryKey, toObject(entryValue)];
  }

  private getComponentMapMeta(mapping: ThemeMappingType, component: string): ComponentMapMetaType {
    const { meta } = getComponentMapping(mapping, component);

    const appearances: string[] = Object.keys(meta.appearances);

    const variants = Object.keys(meta.variants).reduce((acc, group: string) => {
      const groupVariants: string[] = Object.keys(meta.variants[group]);
      return { ...acc, [group]: groupVariants };
    }, {});

    const states: string[] = Object.keys(meta.states).sort((lhs: string, rhs: string) => {
      return meta.states[lhs].priority - meta.states[rhs].priority;
    });

    return { appearances, variants, states };
  }
}
