import {
  SchemaType,
  ControlMappingType,
  ThemeStyleType,
} from '@eva-design/dss';
import { SchemaProcessor } from './schemaProcessor';
import { schema } from './schemaProcessor.spec.config';

const processor: SchemaProcessor = new SchemaProcessor();
const styles: ThemeStyleType = processor.process(schema);

describe('@processor: service checks', () => {
  it('* processes meta properly', () => {
    expect(styles).toMatchSnapshot();
  });
});

describe('@processor: e2e', () => {
  it('* generates all possible styles', () => {
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
  const { states } = createComponentTestMeta(component);
  const hasDefaultAppearance = !!Object.values(component.meta.appearances).find(x => x.default);
  const hasDefaultState = !!Object.values(component.meta.states).find(x => x.default);

  const variantsCombinations = getCombinations(Object.entries(component.meta.variantGroups));
  const statesCombinations = Object.entries(component.meta.states).map(x => x[0]);
  statesCombinations.push(...states.flatMap(
    (v, i) => states.slice(i + 1).map(w => v + '.' + w)));

  let result: string[] = [];
  if (!hasDefaultState) {
    result.push(...variantsCombinations);
  }
  statesCombinations.forEach(state => result.push(...variantsCombinations.map(x => `${x}.${state}`)));

  const temp: string[] = [...result];
  if (hasDefaultAppearance) {
    result = [];
  }
  Object.keys(component.meta.appearances).forEach(appearance => result.push(...temp.map(x => `${appearance}.${x}`)));

  return [...result.values()].length;
}

function getCombinations(entries: [string, Record<string, { default: boolean }>][]): string[] {
  const copy = [...entries];
  const result: Set<string> = new Set<string>();
  entries.forEach((entry, index) => {
    const nextVariants = copy.slice(index + 1).map(x => x[1]);
    if (!Object.values(entry[1]).find(x => x.default)) {
      getVariantsRecursively('', nextVariants).forEach(x => result.add(x));
    }
    Object.keys(entry[1]).forEach((variant) => {
      getVariantsRecursively(variant, nextVariants).forEach(x => result.add(x));
    });
  });
  return [...result.values()];
}

function getVariantsRecursively(rootVariant: string,
  nextVariants: Record<string, { default: boolean }>[]): string[] {
  if (!nextVariants.length) {
    return [];
  }
  const currentVariants = nextVariants[0];
  const newNextVariants = nextVariants.filter(x => x !== currentVariants);
  const localResult: Set<string> = new Set<string>();
  if (rootVariant && !Object.values(currentVariants).find(x => !!x.default)) {
    localResult.add(`${rootVariant}`);
  }
  Object.entries(currentVariants).forEach((entry) => {
    if (rootVariant) {
      localResult.add(`${rootVariant}.${entry[0]}`);
    } else {
      localResult.add(`${entry[0]}`);
    }
  });
  [...localResult.values()].forEach(x => {
    const incrementalCombinations = getVariantsRecursively(x, newNextVariants);
    incrementalCombinations.forEach(combination => localResult.add(combination));
  });
  getVariantsRecursively(rootVariant, newNextVariants).forEach(x => localResult.add(x));
  return [...localResult.values()];
}

function createComponentTestMeta(
  component: ControlMappingType): { appearances: string[], variants: string[][], states: string[] } {
  const { appearances, variantGroups, states } = component.meta;
  return {
    appearances: Object.keys(appearances),
    variants: Object.keys(variantGroups).map(group => Object.keys(variantGroups[group])),
    states: Object.keys(states),
  };
}
