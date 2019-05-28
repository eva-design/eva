import {
  SchemaType,
  ControlMappingType,
  ThemeStyleType,
} from '@eva-design/dss';
import { SchemaProcessor } from './schemaProcessor';
import { schema } from './schemaProcessor.spec.config';

const processor: SchemaProcessor = new SchemaProcessor();

describe('@processor: service checks', () => {

  it('* processes meta properly', () => {
    const value: ThemeStyleType = processor.process(schema);

    expect(value).toMatchSnapshot();
  });

});

describe('@processor: e2e', () => {

  it('* theme style count computed properly', () => {
    const value: number = calculateThemeStyleCount(schema);

    expect(value).toBe(288);
  });

  it('* component style count computed properly', () => {
    const value: number = calculateComponentStyleCount(schema.components.Button);

    expect(value).toBe(288);
  });

  it('* generates all possible styles', () => {
    const styles: ThemeStyleType = processor.process(schema);

    const estimatedCount: number = calculateThemeStyleCount(schema);
    const generatedCount: number = Object.keys(styles).reduce((acc: number, component: string) => {
      const { styles: componentStyles } = styles[component];

      return acc + Object.keys(componentStyles).length;
    }, 0);

    expect(generatedCount).toEqual(estimatedCount);
  });

});

function calculateThemeStyleCount(mappingSchema: SchemaType): number {
  return Object.keys(mappingSchema.components).reduce((acc: number, component: string) => {
    const componentMapping: ControlMappingType = mappingSchema.components[component];
    const componentStyleCount: number = calculateComponentStyleCount(componentMapping);

    return acc + componentStyleCount;
  }, 0);
}

function calculateComponentStyleCount(component: ControlMappingType): number {
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

function createComponentTestMeta(component: ControlMappingType): any {
  const { appearances, variantGroups, states } = component.meta;

  return {
    appearances: Object.keys(appearances),
    variants: Object.keys(variantGroups).map(group => Object.keys(variantGroups[group])),
    states: Object.keys(states),
  };
}
