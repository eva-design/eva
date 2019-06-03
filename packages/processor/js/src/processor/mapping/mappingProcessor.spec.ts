import { MappingProcessor } from './mappingProcessor';
import { mapping } from './mappingProcessor.spec.config';

describe('@processor: service checks', () => {

  const processor = new MappingProcessor();

  it('* processes mapping properly', () => {
    const value = processor.process(mapping);
    expect(value).toMatchSnapshot();
  });

});
