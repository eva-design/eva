import { IndexSignatureBase } from '../common';

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

