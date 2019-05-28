import {
  ThemeStyleType,
  ThemeMappingType,
  StrictTheme,
  ThemedStyleType,
  ControlThemedStyleType,
} from '@eva-design/dss';
import { MappingMetaType } from '../mapping/mappingProcessor';
import { Processor } from '../processor';
import {
  createAllStyles,
  toObject,
} from '../../service';

export interface MappingProcessorParamsType {
  mapping: ThemeMappingType;
  meta: MappingMetaType[];
  theme: StrictTheme;
}

interface NoMetaThemeStyleType {
  [key: string]: {
    [key: string]: ThemedStyleType,
  };
}

export class MetaProcessor implements Processor<MappingProcessorParamsType, ThemeStyleType> {

  public process(params: MappingProcessorParamsType): ThemeStyleType {
    const { mapping, meta, theme } = params;

    const entries = meta.reduce((acc: ThemeStyleType, controlMeta: MappingMetaType) => {
      const { name, appearance, variants, states } = controlMeta;

      const nextAppearanceEntries = createAllStyles(mapping, name, appearance, variants, states, theme);
      const prevAppearanceStyles = acc[name];
      const nextAppearanceStyles = toObject(nextAppearanceEntries);

      return { ...acc, [name]: { ...prevAppearanceStyles, ...nextAppearanceStyles } };
    }, {});

    return this.withControlMeta(mapping, entries);
  }

  private withControlMeta(mapping: ThemeMappingType, style: NoMetaThemeStyleType): ThemeStyleType {
    return Object.keys(style).reduce((acc: ThemeStyleType, control: string) => {
      const controlEntry: ControlThemedStyleType = {
        meta: mapping[control].meta,
        styles: style[control],
      };

      return { ...acc, [control]: controlEntry };
    }, {});
  }
}
