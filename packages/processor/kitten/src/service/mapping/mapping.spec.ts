import * as Service from './mapping.service';
import * as config from './mapping.spec.config';

describe('@mapping: service methods checks', () => {

  describe('* appearance', () => {

    describe('* default', () => {

      const appearance = 'default';

      it('* stateless', () => {
        const mapping = Service.getStatelessAppearanceMapping(config.mapping, 'Test', appearance);

        expect(mapping).toMatchSnapshot();
      });

      describe('* state', () => {

        it('* active', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'active');

          expect(mapping).toMatchSnapshot();
        });

        it('* undefined', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'success');

          expect(mapping).toMatchSnapshot();
        });

        it('* undefined', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toBeUndefined();
        });

        describe('* state', () => {

          it('* active', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'active');

            expect(mapping).toMatchSnapshot();
          });

          it('* undefined', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'undefined');

            expect(mapping).toBeUndefined();
          });

        });

      });

    });

    describe('* custom', () => {

      const appearance = 'custom';

      it('* stateless', () => {
        const mapping = Service.getStatelessAppearanceMapping(config.mapping, 'Test', appearance);

        expect(mapping).toMatchSnapshot();
      });

      describe('* state', () => {

        it('* active', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'active');

          expect(mapping).toMatchSnapshot();
        });

        it('* undefined', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'success');

          expect(mapping).toMatchSnapshot();
        });

        it('* undefined', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toMatchSnapshot();
        });

        describe('* state', () => {

          it('* active', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'active');

            expect(mapping).toMatchSnapshot();
          });

          it('* undefined', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'undefined');

            expect(mapping).toBeUndefined();
          });

        });

      });

    });

    describe('* undefined', () => {

      const appearance = 'undefined';

      it('* stateless', () => {
        const mapping = Service.getStatelessAppearanceMapping(config.mapping, 'Test', appearance);

        expect(mapping).toBeUndefined();
      });

      describe('* state', () => {

        it('* active', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'active');

          expect(mapping).toBeUndefined();
        });

        it('* undefined', () => {
          const mapping = Service.getStateAppearanceMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'success');

          expect(mapping).toBeUndefined();
        });

        it('* undefined', () => {
          const mapping = Service.getStatelessVariantMapping(config.mapping, 'Test', appearance, 'undefined');

          expect(mapping).toBeUndefined();
        });

        describe('* state', () => {

          it('* active', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'active');

            expect(mapping).toBeUndefined();
          });

          it('* undefined', () => {
            const mapping = Service.getStateVariantMapping(config.mapping, 'Test', appearance, 'success', 'undefined');

            expect(mapping).toBeUndefined();
          });

        });

      });

    });

  });

  describe('* variants groups getting', () => {

    it('* expected component', () => {
      const value: string[] = Service.getComponentVariantGroups(config.mapping, 'Test');
      expect(value).toEqual(['status', 'size']);
    });

    it('* unexpected component', () => {
      const value: string[] | undefined = Service.getComponentVariantGroups(config.mapping, 'Undefined');
      expect(value).toBeUndefined();
    });

  });

});
