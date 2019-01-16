import { IndexSignatureBase } from '@eva/common';

export interface TestProcessedComponentMappingMeta {
  variantGroups: string[][];
  appearances: string[];
  states: string[];
}

export interface TestComponentMappingType {
  meta: IndexSignatureBase & any;
  appearance: IndexSignatureBase & any;
}
