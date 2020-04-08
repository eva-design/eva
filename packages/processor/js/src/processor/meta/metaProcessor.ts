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

    const strictTheme: ThemedStyleType = this.processStrictTheme(theme || {});

    const entries = meta.reduce((acc: ThemeStyleType, controlMeta: MappingMetaType) => {
      const { name, appearance, variants, states } = controlMeta;

      const nextAppearanceEntries = createAllStyles(mapping, name, appearance, variants, states, strictTheme);
      const prevAppearanceStyles = acc[name];
      const nextAppearanceStyles = toObject(nextAppearanceEntries);

      return { ...acc, [name]: { ...prevAppearanceStyles, ...nextAppearanceStyles } };
    }, {});

    return this.withControlMeta(mapping, entries);
  }

  private processStrictTheme(theme: StrictTheme): ThemedStyleType {
    return Object.keys(theme).reduce((acc: ThemedStyleType, key: string): ThemedStyleType => {
      return { ...acc, [key]: this.getStrictThemeValue(key, theme, key) };
    }, {});
  }

  private getStrictThemeValue(name: string, theme: StrictTheme, fallback?: any) {

    if (this.isReference(name)) {
      const themeKey: string = this.createKeyFromReference(name);
      return this.findValue(themeKey, theme) || fallback;
    }

    return this.findValue(name, theme) || fallback;
  }

  private findValue(name: string, theme: StrictTheme): string {
    const value: any = theme[name];

    if (this.isReference(value)) {
      const themeKey: string = this.createKeyFromReference(value);
      return this.findValue(themeKey, theme);
    }

    return value;
  }

  private isReference(value: string): boolean {
    return `${value}`.startsWith('$');
  }

  private createKeyFromReference(value: string): string {
    return `${value}`.substring(1);
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
