export interface ThemeMappingType {
  [key: string]: ComponentMappingType;
}

export interface ComponentMappingType {
  meta: {
    scope: ScopeMetaType;
    mapping: {
      [key: string]: PropertyMetaType;
    };
    appearances: {
      [key: string]: AppearanceMetaType;
    };
    variants: {
      [key: string]: {
        [key: string]: VariantMetaType;
      };
    };
    states: {
      [key: string]: StateMetaType;
    };
  };
  appearance: {
    [key: string]: AppearanceMappingType;
  };
}

export type ScopeMetaType = 'mobile' | 'web' | 'all';

export interface PropertyMetaType {
  type: 'number' | 'color';
}

export interface AppearanceMetaType {
  default: boolean;
}

export interface VariantMetaType {
  default: boolean;
}

export interface StateMetaType {
  default: boolean;
  priority: number;
  scope: ScopeMetaType;
}

export interface AppearanceMappingType {
  mapping: StateMappingType;
  variant?: {
    [key: string]: {
      [key: string]: VariantMappingType;
    };
  };
}

export interface VariantMappingType {
  mapping: StateMappingType;
}

export interface MappingType {
  [key: string]: PropertyType | MappingType;
}

export interface StateMappingType extends MappingType {
  state?: {
    [key: string]: MappingType;
  };
}

export type PropertyType = string | number;

export interface ComponentMapMetaType {
  appearances: string[];
  variants: {
    [key: string]: string[];
  };
  states: string[];
}

export interface ThemeStyleType {
  [key: string]: ComponentThemedStyleType;
}

export interface ComponentThemedStyleType {
  [key: string]: ThemedStyleType;
}

export interface ThemedStyleType {
  [key: string]: number | string | ThemedStyleType;
}
