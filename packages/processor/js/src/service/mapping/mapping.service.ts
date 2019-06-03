import {
  ThemeMappingType,
  ControlMappingType,
  AppearanceMappingType,
  MappingType,
  StateMappingType,
} from '@eva-design/dss';
import { safe } from '../common';

export function getComponentDefaultAppearance(mapping: ThemeMappingType,
                                              component: string): string | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { appearances } = value.meta;

    return Object.keys(appearances).find((appearance: string) => {
      return appearances[appearance].default === true;
    });
  });
}

export function getComponentDefaultVariants(mapping: ThemeMappingType,
                                            component: string): string[] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups).map((group: string) => {
      return Object.keys(variantGroups[group]).find((variant: string) => {
        return variantGroups[group][variant].default === true;
      });
    });
  });
}

export function getComponentDefaultState(mapping: ThemeMappingType,
                                         component: string): string | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { states } = value.meta;

    return Object.keys(states).find((state: string) => {
      return states[state].default === true;
    });
  });
}

export function getComponentVariantGroups(mapping: ThemeMappingType,
                                          component: string): string[] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups);
  });
}

export function getComponentVariants(mapping: ThemeMappingType,
                                     component: string): string[][] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups).map((group: string) => {
      return Object.keys(variantGroups[group]);
    });
  });
}

export function getComponentStates(mapping: ThemeMappingType,
                                   component: string): string[] | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    const { states } = value.meta;

    return Object.keys(states);
  });
}

export function getStateAppearanceMapping(mapping: ThemeMappingType,
                                          component: string,
                                          appearance: string,
                                          state: string): MappingType | undefined {

  const appearanceMapping = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: StateMappingType) => {
    return getStateMapping(value, state);
  });
}

export function getStatelessAppearanceMapping(mapping: ThemeMappingType,
                                              component: string,
                                              appearance: string): MappingType | undefined {

  const appearanceMapping = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: StateMappingType) => {
    const { state, ...params } = value;

    return params;
  });
}

export function getStateVariantMapping(mapping: ThemeMappingType,
                                       component: string,
                                       appearance: string,
                                       variant: string,
                                       state: string): MappingType | undefined {

  const variantMapping = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType) => {
    return getStateMapping(value, state);
  });
}

export function getStatelessVariantMapping(mapping: ThemeMappingType,
                                           component: string,
                                           appearance: string,
                                           variant: string): MappingType | undefined {

  const variantMapping = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType) => {
    const { state, ...params } = value;

    return params;
  });
}

export function getComponentMapping(mapping: ThemeMappingType,
                                    component: string): ControlMappingType | undefined {

  return mapping[component];
}

function getAppearance(mapping: ThemeMappingType,
                       component: string,
                       appearance: string): AppearanceMappingType | undefined {

  const componentMapping = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType) => {
    return value.appearances[appearance];
  });
}

function getAppearanceMapping(mapping: ThemeMappingType,
                              component: string,
                              appearance: string): StateMappingType | undefined {

  const appearanceConfig = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceMappingType) => {
    return value.mapping;
  });
}

function getVariantMapping(mapping: ThemeMappingType,
                           component: string,
                           appearance: string,
                           variant: string): MappingType | undefined {

  const appearanceConfig = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceMappingType) => {
    return safe(value.variantGroups, (groupValue) => {

      const groupName = Object.keys(groupValue).find((group: string) => {
        return groupValue[group][variant] !== undefined;
      });

      return safe(groupName, (groupNameValue) => {
        return groupValue[groupNameValue][variant];
      });
    });
  });
}

function getStateMapping(mapping: StateMappingType,
                         state: string): MappingType | undefined {

  return safe(mapping.state, (value) => {
    return value[state];
  });
}
