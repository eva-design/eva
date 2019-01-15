import { safe } from '../common';
import {
  ThemeMappingType,
  ComponentMappingType,
  AppearanceType,
  VariantGroupType,
  MappingType,
  StateType,
} from './type';

export const APPEARANCE_DEFAULT = 'default';

export function getComponentVariantGroups(mapping: ThemeMappingType,
                                          component: string): string[] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ComponentMappingType) => {
    return Object.keys(value.meta.variants);
  })
}

export function getComponentVariants(mapping: ThemeMappingType,
                                     component: string): string[][] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ComponentMappingType) => {
    const variantGroups = Object.keys(value.meta.variants);

    return variantGroups.map((group: string) => {
      return value.meta.variants[group];
    });
  })
}

export function getComponentStates(mapping: ThemeMappingType,
                                   component: string): string[] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ComponentMappingType) => {
    return value.meta.states;
  });
}

export function getStateAppearanceMapping(mapping: ThemeMappingType,
                                          component: string,
                                          appearance: string,
                                          state: string): any | undefined {

  const appearanceMapping = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: MappingType) => {
    return getMappingState(value, state);
  });
}

export function getStatelessAppearanceMapping(mapping: ThemeMappingType,
                                              component: string,
                                              appearance: string): any | undefined {

  const appearanceMapping = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: MappingType) => {
    const {state, ...params} = value;
    return params;
  });
}

export function getStateVariantMapping(mapping: ThemeMappingType,
                                       component: string,
                                       appearance: string,
                                       variant: string,
                                       state: string): any | undefined {

  const variantMapping = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType) => {
    return getMappingState(value, state);
  });
}

export function getStatelessVariantMapping(mapping: ThemeMappingType,
                                           component: string,
                                           appearance: string,
                                           variant: string): any | undefined {

  const variantMapping = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType) => {
    const {state, ...params} = value;
    return params;
  });
}

function getComponentMapping(mapping: ThemeMappingType,
                             component: string): ComponentMappingType | undefined {

  return mapping[component];
}

function getAppearance(mapping: ThemeMappingType,
                       component: string,
                       appearance: string): AppearanceType | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ComponentMappingType) => {
    return value.appearance[appearance];
  });
}

function getMappingState(mapping: MappingType,
                         state: string): StateType | undefined {

  return safe(mapping.state, (value: StateType) => {
    return value[state];
  });
}

function getAppearanceMapping(mapping: ThemeMappingType,
                              component: string,
                              appearance: string): MappingType | undefined {

  const appearanceConfig = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceType) => {
    return value.mapping;
  });
}

function getAppearanceVariantGroups(mapping: ThemeMappingType,
                                    component: string,
                                    appearance: string): VariantGroupType | undefined {

  const appearanceConfig = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceType) => {
    return value.variant;
  });
}

function getVariantMapping(mapping: ThemeMappingType,
                           component: string,
                           appearance: string,
                           variant: string): MappingType | undefined {

  const variantGroups = getAppearanceVariantGroups(mapping, component, appearance);

  const groupName = safe(variantGroups, value => {
    return Object.keys(value).find((group: string) => {
      return value[group][variant] !== undefined;
    });
  });

  return safe(groupName, value => {
    return safe(variantGroups[value][variant], value => value.mapping);
  });
}
