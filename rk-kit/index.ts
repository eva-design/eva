import { default as mapping } from './generated';
import {
  getStyle as getGeneratedStyle,
  StyleMappingType,
} from '../processor/rk-kit';

export function getStyle(component: string,
                         appearance: string,
                         variants: string[],
                         states: string[]): StyleMappingType {

  return getGeneratedStyle(mapping, component, appearance, variants, states);
}

export {
  getComponentVariantGroups,
  getComponentStates,
  createStyle,

  APPEARANCE_DEFAULT,

  ThemeMappingType,
  StyleMappingType,
} from '../processor/rk-kit';
