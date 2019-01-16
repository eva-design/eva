import { IndexSignatureBase } from '../common';

export type StyleMappingType = IndexSignatureBase & any;

export type ThemeMappingType = IndexSignatureBase & any;

export interface ComponentMappingMetaType {
  variants: IndexSignatureBase & any;
  states: string[];
}

export interface ComponentMappingType {
  meta: ComponentMappingMetaType;
  appearance: AppearanceType;
}

export interface AppearanceType {
  mapping?: MappingType;
  variant?: VariantGroupType;
}

export type VariantGroupType = IndexSignatureBase & any;

export interface MappingType {
  [key: string]: any;

  state?: StateType;
}

export type StateType = IndexSignatureBase & any;

export interface MappingMetaType {
  name: string;
  appearance: string;
  states: string[];
  variants: string[];
}
