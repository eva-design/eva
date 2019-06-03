import { MappingType } from '@eva-design/dss';
import { mapping } from './mapping.spec.config';
import * as Service from './mapping.service';

describe('@mapping: service methods checks', () => {

  describe('* appearance', () => {

    describe('* default', () => {

      const appearance: string = 'filled';

      it('* stateless', () => {
        const value: MappingType = Service.getStatelessAppearanceMapping(
          mapping,
          'Button',
          appearance,
        );

        expect(value).toMatchSnapshot();
      });

      describe('* state', () => {

        it('* active', () => {
          const value: MappingType = Service.getStateAppearanceMapping(
            mapping,
            'Button',
            appearance,
            'active',
          );

          expect(value).toMatchSnapshot();
        });

        it('* undefined', () => {
          const value: MappingType = Service.getStateAppearanceMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const value: MappingType = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'success',
          );

          expect(value).toMatchSnapshot();
        });

        it('* undefined', () => {
          const value = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toBeUndefined();
        });

        describe('* state', () => {

          it('* active', () => {
            const value: MappingType = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'active',
            );

            expect(value).toMatchSnapshot();
          });

          it('* undefined', () => {
            const value: MappingType = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'undefined',
            );

            expect(value).toBeUndefined();
          });

        });

      });

    });

    describe('* custom', () => {

      const appearance: string = 'outline';

      it('* stateless', () => {
        const value = Service.getStatelessAppearanceMapping(
          mapping,
          'Button',
          appearance,
        );

        expect(value).toMatchSnapshot();
      });

      describe('* state', () => {

        it('* active', () => {
          const value = Service.getStateAppearanceMapping(mapping,
            'Button',
            appearance,
            'active',
          );

          expect(value).toMatchSnapshot();
        });

        it('* undefined', () => {
          const value = Service.getStateAppearanceMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const value = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'success',
          );

          expect(value).toMatchSnapshot();
        });

        it('* undefined', () => {
          const value = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toMatchSnapshot();
        });

        describe('* state', () => {

          it('* active', () => {
            const value = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'active',
            );

            expect(value).toMatchSnapshot();
          });

          it('* undefined', () => {
            const value = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'undefined',
            );


            expect(value).toBeUndefined();
          });

        });

      });

    });

    describe('* undefined', () => {

      const appearance = 'undefined';

      it('* stateless', () => {
        const value = Service.getStatelessAppearanceMapping(
          mapping,
          'Button',
          appearance,
        );

        expect(value).toBeUndefined();
      });

      describe('* state', () => {

        it('* active', () => {
          const value = Service.getStateAppearanceMapping(
            mapping,
            'Button',
            appearance,
            'active',
          );

          expect(value).toBeUndefined();
        });

        it('* undefined', () => {
          const value = Service.getStateAppearanceMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toBeUndefined();
        });

      });

      describe('* variant', () => {

        it('* success', () => {
          const value = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'success',
          );

          expect(value).toBeUndefined();
        });

        it('* undefined', () => {
          const value = Service.getStatelessVariantMapping(
            mapping,
            'Button',
            appearance,
            'undefined',
          );

          expect(value).toBeUndefined();
        });

        describe('* state', () => {

          it('* active', () => {
            const value = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'active',
            );

            expect(value).toBeUndefined();
          });

          it('* undefined', () => {
            const value = Service.getStateVariantMapping(
              mapping,
              'Button',
              appearance,
              'success',
              'undefined',
            );

            expect(value).toBeUndefined();
          });

        });

      });

    });

  });

  describe('* variants groups getting', () => {

    it('* defined component', () => {
      const value: string[] = Service.getComponentVariantGroups(
        mapping,
        'Button',
      );

      expect(value).toEqual(['status', 'size']);
    });

    it('* undefined component', () => {
      const value: string[] | undefined = Service.getComponentVariantGroups(mapping, 'Undefined');

      expect(value).toBeUndefined();
    });

  });

});
