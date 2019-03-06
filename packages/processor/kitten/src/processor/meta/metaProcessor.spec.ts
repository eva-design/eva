import {
  ComponentMappingType,
  ThemeMappingType,
  ThemeStyleType,
} from '@eva/types';
import {
  MappingProcessor,
  MappingMetaType,
} from '../mapping/mappingProcessor';
import { MetaProcessor } from './metaProcessor';
import { mapping } from './metaProcessor.spec.config';

const metaProcessor: MetaProcessor = new MetaProcessor();
const mappingProcessor: MappingProcessor = new MappingProcessor();

const process = (themeMapping: ThemeMappingType): ThemeStyleType => {
  const meta: MappingMetaType[] = mappingProcessor.process(themeMapping);

  return metaProcessor.process({
    mapping: themeMapping,
    meta: meta,
  });
};

describe('@processor: service checks', () => {

  it('* processes meta properly', () => {
    const value: ThemeStyleType = process(mapping);

    expect(value).toMatchSnapshot();
  });

});

describe('@processor: e2e', () => {

  it('* theme style count computed properly', () => {
    const value: number = calculateThemeStyleCount(mapping);

    expect(value).toBe(288);
  });

  it('* component style count computed properly', () => {
    const value: number = calculateComponentStyleCount(mapping.Button);

    expect(value).toBe(288);
  });

  it('* generates all possible styles', () => {
    const styles: ThemeStyleType = process(mapping);

    const estimatedCount: number = calculateThemeStyleCount(mapping);
    const generatedCount: number = Object.keys(styles).reduce((acc: number, component: string) => {
      return acc + Object.keys(styles[component]).length;
    }, 0);

    expect(generatedCount).toEqual(estimatedCount);
  });

});

function calculateThemeStyleCount(themeMapping: ThemeMappingType): number {
  return Object.keys(themeMapping).reduce((acc: number, component: string) => {
    const componentMapping: ComponentMappingType = themeMapping[component];
    const componentStyleCount: number = calculateComponentStyleCount(componentMapping);

    return acc + componentStyleCount;
  }, 0);
}

function calculateComponentStyleCount(component: ComponentMappingType): number {
  const { appearances, variants, states } = createComponentTestMeta(component);

  const stateCombinations: number = Math.pow(2, states.length) - 1;

  const variantGroupCounts: number[] = variants.map((group: string[]) => {
    return group.length;
  });

  const plainVariants: number = variantGroupCounts.reduce((acc: number, groupCount: number) => {
    return acc + groupCount;
  }, 0);

  const combinedVariants: number = variantGroupCounts.reduce((acc: number, groupCount: number) => {
    return acc * groupCount;
  });

  const accVariants: number = plainVariants + combinedVariants;
  const stateVariants: number = accVariants * stateCombinations;

  return appearances.length * (accVariants + stateVariants + stateCombinations + 1);
}

function createComponentTestMeta(component: ComponentMappingType): any {
  const { appearances, variants, states } = component.meta;

  return {
    appearances: Object.keys(appearances),
    variants: Object.keys(variants).map(group => Object.keys(variants[group])),
    states: Object.keys(states),
  };
}
