import { MappingProcessor } from './mappingProcessor';
import {
  mapping,
  emptyMapping,
} from './mappingProcessor.spec.config';

describe('@processor: service checks', () => {

  const processor = new MappingProcessor();

  it('* theme mapping meta expected', () => {
    const value = processor.process(mapping);
    expect(value).toMatchSnapshot();
  });

  it('* theme mapping meta empty', () => {
    const value = processor.process(emptyMapping);
    expect(value).toMatchSnapshot();
  });

});
