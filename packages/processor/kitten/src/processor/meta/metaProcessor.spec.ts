import { IndexSignatureBase } from '@eva/common';
import { MetaProcessor } from './metaProcessor';
import { MappingProcessor } from '../';
import {
  mapping,
  emptyMapping,
} from './metaProcessor.spec.config';
import { getAllStylesCount } from '../../service';

describe('@processor: service checks', () => {

  const processor: MetaProcessor = new MetaProcessor();
  const mappingProcessor: MappingProcessor = new MappingProcessor();

  it('* theme map expected', () => {
    const value = processor.process({
      mapping: mapping,
      meta: mappingProcessor.process(mapping),
    });
    expect(value).toMatchSnapshot();
  });

  it('* theme map unexpected', () => {
    const value = processor.process({
      mapping: mapping,
      meta: mappingProcessor.process(emptyMapping),
    });
    expect(value).toMatchSnapshot();
  });

});

describe('* checking size of generated styles', () => {

  const processor = new MetaProcessor();
  const mappingProcessor: MappingProcessor = new MappingProcessor();

  it('* 1', () => {
    const value = processor.process({
      mapping: mapping,
      meta: mappingProcessor.process(mapping),
    });
    const generatedCount: number = getAllStylesCount(mapping);
    const expected: number = Object.values(value)
      .map((component: IndexSignatureBase) => Object.keys(component).length - 1)
      .reduce((acc: number, curr: number) => acc + curr);

    expect(expected).toBe(generatedCount);
  });

  it('* 2', () => {
    const value = processor.process({
      mapping: mapping,
      meta: mappingProcessor.process(emptyMapping),
    });
    const generatedCount: number = getAllStylesCount(emptyMapping);
    const expected: number = Object.values(value)
      .map((component: IndexSignatureBase) => Object.keys(component).length - 1)
      .reduce((acc: number, curr: number) => acc + curr);

    expect(expected).toBe(generatedCount);
  });

});
