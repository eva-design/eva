import {
  ThemeMappingType,
  ControlMappingType,
  AppearanceMappingType,
  MappingType,
  StatelessMappingType,
} from '@eva-design/dss';
import { safe } from '../common';

export function getComponentDefaultAppearance(mapping: ThemeMappingType,
                                              component: string): string | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string => {
    const { appearances } = value.meta;

    return Object.keys(appearances).find((appearance: string): boolean => {
      return appearances[appearance].default === true;
    });
  });
}

export function getComponentDefaultVariants(mapping: ThemeMappingType,
                                            component: string): string[] | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string[] => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups).map((group: string): string => {
      return Object.keys(variantGroups[group]).find((variant: string): boolean => {
        return variantGroups[group][variant].default === true;
      });
    });
  });
}

export function getComponentDefaultState(mapping: ThemeMappingType,
                                         component: string): string | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string => {
    const { states } = value.meta;

    return Object.keys(states).find((state: string): boolean => {
      return states[state].default === true;
    });
  });
}

export function getComponentVariantGroups(mapping: ThemeMappingType,
                                          component: string): string[] | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string[] => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups);
  });
}

export function getComponentVariants(mapping: ThemeMappingType,
                                     component: string): string[][] | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string[][] => {
    const { variantGroups } = value.meta;

    return Object.keys(variantGroups).map((group: string): string[] => {
      return Object.keys(variantGroups[group]);
    });
  });
}

export function getComponentStates(mapping: ThemeMappingType,
                                   component: string): string[] | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): string[] => {
    const { states } = value.meta;

    return Object.keys(states);
  });
}

export function getStateAppearanceMapping(mapping: ThemeMappingType,
                                          component: string,
                                          appearance: string,
                                          state: string): StatelessMappingType | undefined {

  const appearanceMapping: MappingType = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: MappingType): StatelessMappingType => {
    return getStateMapping(value, state);
  });
}

export function getStatelessAppearanceMapping(mapping: ThemeMappingType,
                                              component: string,
                                              appearance: string): StatelessMappingType | undefined {

  const appearanceMapping: MappingType = getAppearanceMapping(mapping, component, appearance);

  return safe(appearanceMapping, (value: MappingType): StatelessMappingType => {
    const { state, ...params } = value;

    return params as StatelessMappingType;
  });
}

export function getStateVariantMapping(mapping: ThemeMappingType,
                                       component: string,
                                       appearance: string,
                                       variant: string,
                                       state: string): MappingType | undefined {

  const variantMapping: MappingType = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType): MappingType => {
    return getStateMapping(value, state);
  });
}

export function getStatelessVariantMapping(mapping: ThemeMappingType,
                                           component: string,
                                           appearance: string,
                                           variant: string): StatelessMappingType | undefined {

  const variantMapping: MappingType = getVariantMapping(mapping, component, appearance, variant);

  return safe(variantMapping, (value: MappingType): StatelessMappingType => {
    const { state, ...params } = value;

    return params as StatelessMappingType;
  });
}

export function getComponentMapping(mapping: ThemeMappingType,
                                    component: string): ControlMappingType | undefined {

  return mapping[component];
}

function getAppearance(mapping: ThemeMappingType,
                       component: string,
                       appearance: string): AppearanceMappingType | undefined {

  const componentMapping: ControlMappingType = getComponentMapping(mapping, component);

  return safe(componentMapping, (value: ControlMappingType): AppearanceMappingType => {
    return value.appearances[appearance];
  });
}

function getAppearanceMapping(mapping: ThemeMappingType,
                              component: string,
                              appearance: string): MappingType | undefined {

  const appearanceConfig: AppearanceMappingType = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceMappingType): MappingType => {
    return value.mapping;
  });
}

function getVariantMapping(mapping: ThemeMappingType,
                           component: string,
                           appearance: string,
                           variant: string): MappingType | undefined {

  const appearanceConfig: AppearanceMappingType = getAppearance(mapping, component, appearance);

  return safe(appearanceConfig, (value: AppearanceMappingType): MappingType => {
    return safe(value.variantGroups, (groupValue): MappingType => {

      const groupName = Object.keys(groupValue).find((group: string) => {
        return groupValue[group][variant] !== undefined;
      });

      return safe(groupName, (groupNameValue): MappingType => {
        return groupValue[groupNameValue][variant];
      });
    });
  });
}

function getStateMapping(mapping: MappingType, state: string): StatelessMappingType | undefined {

  return safe(mapping.state, (value): StatelessMappingType => {
    return value[state];
  });
}
