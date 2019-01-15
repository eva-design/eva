import { TestProcessedComponentMappingMeta, TestComponentMappingType } from './';
import { ThemeMappingType } from '../mapping';

/**
 * Test Service: service for testing of count of possible component's styles from mapping
 */

export function getComponentStyleCount(component: TestProcessedComponentMappingMeta): number {
  const possibleStatesCombinationsLength: number = Math.pow(2, component.states.length) - 1;

  const variantsCombinationsLengths: number[] = component.variantGroups
    .map((item: string[]) => item.length);
  const varCombLenSum: number = variantsCombinationsLengths.length ? variantsCombinationsLengths
    .reduce((acc, curr) => acc + curr) : 0;
  const varCombLenMult: number = variantsCombinationsLengths.length ?  variantsCombinationsLengths
    .reduce((acc, curr) => acc * curr) : 0;
  const variantsPossibleCombinations: number = varCombLenSum + varCombLenMult;

  return (possibleStatesCombinationsLength * variantsPossibleCombinations +
    variantsPossibleCombinations + possibleStatesCombinationsLength + 1) *
    component.appearances.length;
}

export function getAllStylesCount(mapping: ThemeMappingType): number {
  const mappingMetaCombsCounts: number[] = Object.keys(mapping)
    .map((component: string) =>
      getComponentStyleCount(createTestComponentMeta(mapping[component])));

  return mappingMetaCombsCounts.reduce((acc, curr) => acc + curr);
}

export function createTestComponentMeta(component: TestComponentMappingType): TestProcessedComponentMappingMeta {
  return component && {
    appearances: Object.keys(component.appearance),
    states: component.meta.states,
    variantGroups: Object.keys(component.meta.variants)
      .map(varGroup => component.meta.variants[varGroup]),
  }
}