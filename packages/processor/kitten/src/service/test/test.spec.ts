import { mapping } from './test.spec.config';
import * as Service from './test.service';
import {
  TestProcessedComponentMappingMeta,
  TestComponentMappingType,
} from './';

describe('@test: service methods checks', () => {

  describe('* create test component meta', () => {

    it('* expected component', () => {
      const component: TestComponentMappingType = mapping.Test;
      expect(Service.createTestComponentMeta(component)).toMatchSnapshot();
    });

    it('* unexpected component', () => {
      const component: TestComponentMappingType = mapping.Empty;
      expect(Service.createTestComponentMeta(component)).toMatchSnapshot();
    });

  });

  describe('* get component possible styles count', () => {

    it('* expected component', () => {
      const component: TestProcessedComponentMappingMeta = Service.createTestComponentMeta(mapping.Test);
      expect(Service.getComponentStyleCount(component)).toBe(144);
    });

    it('* unexpected component', () => {
      const component: TestProcessedComponentMappingMeta = Service.createTestComponentMeta(mapping.Empty);
      expect(Service.getComponentStyleCount(component)).toBe(0);
    });

  });

  describe('* get all components styles count', () => {
    it('* whole mapping', () => {
      expect(Service.getAllStylesCount(mapping)).toBe(144);
    });
  });

});
