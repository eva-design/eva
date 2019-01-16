import { IndexSignatureBase } from '../common';

export type ComponentMapStyleType = IndexSignatureBase & any;

export interface ComponentMapMetaType {
  variants: IndexSignatureBase;
  states: string[];
}

export interface ComponentMapType {
  meta: ComponentMapMetaType;

  [key: string]: ComponentMapStyleType;
}

export interface ThemeMapType {
  [key: string]: ComponentMapType;
}
