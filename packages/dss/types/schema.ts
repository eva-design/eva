export interface SchemaType {
  version: number;
  strict?: StrictTheme;
  components: ThemeMappingType;
}

export interface StrictTheme {
  [key: string]: ParameterType;
}

export interface ThemeMappingType {
  [key: string]: ControlMappingType;
}

export interface ControlMappingType {
  meta: ControlMetaType;
  appearances: {
    [key: string]: AppearanceMappingType;
  };
}

export interface ControlMetaType {
  scope: ScopeMetaType;
  parameters: {
    [key: string]: PropertyMetaType;
  };
  appearances: {
    [key: string]: AppearanceMetaType;
  };
  variantGroups: {
    [key: string]: {
      [key: string]: VariantMetaType;
    };
  };
  states: {
    [key: string]: StateMetaType;
  };
}

export type ScopeMetaType = string | 'mobile' | 'web' | 'all';

export interface PropertyMetaType {
  type: string | 'number' | 'string';
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
  mapping: MappingType;
  variantGroups?: {
    [key: string]: {
      [key: string]: MappingType;
    };
  };
}

export interface StatelessMappingType {
  [key: string]: ParameterType;
}

export interface StatefulMappingType {
  state: {
    [key: string]: StatelessMappingType;
  };
}

export type MappingType = StatelessMappingType | StatefulMappingType;

export type ParameterType = string | number;

export interface ThemeStyleType {
  [key: string]: ControlThemedStyleType;
}

export interface ControlThemedStyleType {
  meta: ControlMetaType;
  styles: {
    [key: string]: ThemedStyleType;
  };
}

export interface ThemedStyleType {
  [key: string]: number | string | ThemedStyleType;
}
