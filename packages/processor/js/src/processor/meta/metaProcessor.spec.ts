import { MetaProcessor } from './metaProcessor';
import { ThemeStyleType } from '@eva-design/dss';
import {
  mapping,
  meta,
  theme,
} from './metaProcessor.spec.config';

const processor: MetaProcessor = new MetaProcessor();

describe('@processor: service checks', () => {

  it('* processes meta properly', () => {
    const value: ThemeStyleType = processor.process({
      mapping,
      meta,
      theme,
    });

    expect(value).toMatchSnapshot();
  });

});
