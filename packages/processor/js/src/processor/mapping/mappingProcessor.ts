import {
  ThemeMappingType,
  ControlMappingType,
} from '@eva-design/dss';
import { Processor } from '../processor';
import {
  getComponentVariants,
  getComponentStates,
  needsAllVariantCases,
  SEPARATOR_MAPPING_ENTRY,
} from '../../service';

export interface MappingMetaType {
  name: string;
  appearance: string;
  variants: string[];
  states: string[];
}

export class MappingProcessor implements Processor<ThemeMappingType, MappingMetaType[]> {

  public process(params: ThemeMappingType): MappingMetaType[] {
    return Object.keys(params).reduce((acc: MappingMetaType[], component: string) => {
      return [
        ...acc,
        ...this.getComponentMappingMeta(params, component),
      ];
    }, []);
  }

  private getComponentMappingMeta(mapping: ThemeMappingType, component: string): MappingMetaType[] {
    const componentMapping: ControlMappingType = mapping[component];
    //variants and states possible configurations are the same across all appearances, so we can evaluate them once
    const variants = this.getComponentVariants(mapping, component);
    const states = this.getComponentStates(mapping, component);

    return Object.keys(componentMapping.appearances).map((appearance: string): MappingMetaType => {
      return {
        name: component,
        appearance,
        variants,
        states,
      };
    });
  }

  private getComponentVariants(mapping: ThemeMappingType, component: string): string[] {
    const needsAllCases = needsAllVariantCases(mapping, component);
    const variants: string[][] = getComponentVariants(mapping, component);

    return this.concatComponentVariants(variants, [], needsAllCases);
  }

  private getComponentStates(mapping: ThemeMappingType, component: string): string[] {
    const states: string[] = getComponentStates(mapping, component);

    return this.concatComponentStates([...states]);
  }

  private concatComponentVariants(variants: string[][], result: string[], needsAllCases: boolean): string[] {
    if (variants.length === 0) {
      return result;
    }

    if (needsAllCases) {
      //this is the case when there is no default path for variant groups,
      //e.i. not all variant groups values has default values
      //all possible combinations will be evaluated
      const concat = variants.reduce((acc: string[], current: string[]) => {
        return [...acc, ...this.concatVariantGroups(acc, current)];
      }, variants.shift());

      return this.concatComponentVariants(variants, [...result, ...concat], needsAllCases);
    }

    //by default, we will evaluate only required variant groups combinations
    return variants.reduce((acc: string[], current: string[]) => {
      if (acc.length === 0) {
        return current;
      }

      return acc.reduce((res, c) => {
        return [...res, ...current.map(x => c.concat(SEPARATOR_MAPPING_ENTRY, x))];
      }, []);
    }, []);
  }

  private concatVariantGroups(lhs: string[], rhs: string[]): string[] {
    return lhs.reduce((acc: string[], lhsValue: string) => {
      const concat = rhs.map(rhsValue => {
        return lhsValue.concat(SEPARATOR_MAPPING_ENTRY, rhsValue);
      });
      return [...acc, ...concat];
    }, []);
  }

  private concatComponentStates(states: string[], result: string[] = []): string[] {
    if (states.length === 0) {
      return result;
    }

    const concat = states.reduce((acc: string[], current: string) => {
      const next = acc.map(value => value.concat(SEPARATOR_MAPPING_ENTRY, current));
      return [...acc, ...next];
    }, [states.shift()]);

    return this.concatComponentStates(states, [...result, ...concat]);
  }
}
