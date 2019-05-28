import * as Service from './style.service';
import { mapping } from './style.spec.config';
import {
  ThemedStyleType,
  StrictTheme,
} from '@eva-design/dss';

describe('@style: service methods checks', () => {

  describe('* preprocess', () => {

    describe('* normalizes appearance properly', () => {

      it('* explicit default', () => {
        const value: string[] = Service.normalizeAppearance(
          mapping,
          'Button',
          'filled',
        );

        expect(value).toEqual([
          'filled',
        ]);
      });

      it('* custom', () => {
        const value: string[] = Service.normalizeAppearance(
          mapping,
          'Button',
          'outline',
        );

        expect(value).toEqual([
          'filled',
          'outline',
        ]);
      });

      it('* empty', () => {
        const value: string[] = Service.normalizeAppearance(
          mapping,
          'Button',
          '',
        );

        expect(value).toEqual([
          'filled',
        ]);
      });

      it('* undefined', () => {
        const value: string[] = Service.normalizeAppearance(
          mapping,
          'Button',
          undefined,
        );

        expect(value).toEqual([
          'filled',
        ]);
      });

    });

    describe('* normalizes variants properly', () => {

      it('* explicit default', () => {
        const value: string[] = Service.normalizeVariants(
          mapping,
          'Button',
          ['primary', 'medium'],
        );

        expect(value).toEqual([
          'primary',
          'medium',
        ]);
      });

      it('* with custom', () => {
        const value: string[] = Service.normalizeVariants(
          mapping,
          'Button',
          ['success'],
        );

        expect(value).toEqual([
          'primary',
          'medium',
          'success',
        ]);
      });

      it('* empty', () => {
        const value: string[] = Service.normalizeVariants(
          mapping,
          'Button',
          [],
        );

        expect(value).toEqual([
          'primary',
          'medium',
        ]);
      });

      it('* with duplicates', () => {
        const value: string[] = Service.normalizeVariants(
          mapping,
          'Button',
          ['success', 'success'],
        );

        expect(value).toEqual([
          'primary',
          'medium',
          'success',
        ]);
      });

      it('* with undefined', () => {
        const value: string[] = Service.normalizeVariants(
          mapping,
          'Button',
          [undefined, null],
        );

        expect(value).toEqual([
          'primary',
          'medium',
        ]);
      });

    });

    describe('* normalizes states properly', () => {
      const states: string[] = [
        'active',
        'checked',
        'disabled',
      ];

      const calculateStateWeight = (state: string): number => {
        switch (state) {
          case 'active':
            return 0;
          case 'checked':
            return 1;
          case 'disabled':
            return 2;
        }
      };

      it('* with applied states', () => {
        const value: string[] = Service.normalizeStates(
          mapping,
          'Button',
          states,
          calculateStateWeight,
        );

        expect(value).toEqual([
          'active',
          'checked',
          'disabled',
          'active.checked',
          'active.disabled',
          'checked.disabled',
          'active.checked.disabled',
        ]);
      });

      it('* empty', () => {
        const value: string[] = Service.normalizeStates(
          mapping,
          'Button',
          [],
          calculateStateWeight,
        );

        expect(value).toEqual([]);
      });

      it('* with duplicates', () => {
        const value: string[] = Service.normalizeStates(
          mapping,
          'Button',
          [...states, 'active'],
          calculateStateWeight,
        );

        expect(value).toEqual([
          'active',
          'checked',
          'disabled',
          'active.checked',
          'active.disabled',
          'checked.disabled',
          'active.checked.disabled',
        ]);
      });

      it('* with undefined', () => {
        const value: string[] = Service.normalizeStates(
          mapping,
          'Button',
          [...states, undefined],
          calculateStateWeight,
        );

        expect(value).toEqual([
          'active',
          'checked',
          'disabled',
          'active.checked',
          'active.disabled',
          'checked.disabled',
          'active.checked.disabled',
        ]);
      });

      it('* custom separator', () => {
        const value: string[] = Service.normalizeStates(
          mapping,
          'Button',
          states,
          calculateStateWeight,
          '-',
        );

        expect(value).toEqual([
          'active',
          'checked',
          'disabled',
          'active-checked',
          'active-disabled',
          'checked-disabled',
          'active-checked-disabled',
        ]);
      });

    });

    describe('* style query', () => {

      const source: string[] = [
        'default',
        'default.checked',
        'default.success',
        'default.success.checked',
        'default.success.small.checked',
        'default.success.small.checked.active',
      ];

      it('* appearance only', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
        ]);

        expect(value).toEqual('default');
      });

      it('* appearance and state', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'checked',
        ]);

        expect(value).toEqual('default.checked');
      });

      it('* appearance and variant', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'success',
        ]);

        expect(value).toEqual('default.success');
      });

      it('* appearance and variant and state', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'success',
          'checked',
        ]);

        expect(value).toEqual('default.success.checked');
      });

      it('* appearance and variants and state', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'success',
          'small',
          'checked',
        ]);

        expect(value).toEqual('default.success.small.checked');
      });

      it('* appearance and variants and states', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'success',
          'small',
          'checked',
          'active',
        ]);

        expect(value).toEqual('default.success.small.checked.active');
      });

      it('* unordered', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'checked',
          'small',
          'success',
          'active',
        ]);

        expect(value).toEqual('default.success.small.checked.active');
      });

      it('* with undefined in config', () => {
        const value: string = Service.findStyleKey(source, [
          'default',
          'error',
          'small',
          'checked',
          'active',
        ]);

        expect(value).toEqual(undefined);
      });

    });

  });

  describe('* styling', () => {

    describe('* default appearance', () => {

      const appearance: string = 'filled';

      it('* stateless', () => {
        const value: ThemedStyleType = Service.createStyle(mapping, 'Button', appearance);

        expect(value).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* single', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            [],
            ['active'],
          );

          expect(value).toMatchSnapshot();
        });

        it('* multiple', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            [],
            ['disabled', 'active'],
          );

          expect(value).toMatchSnapshot();
        });
      });

      describe('* with variant', () => {

        describe('* single', () => {

          it('* no state', () => {
            const value: ThemedStyleType = Service.createStyle(
              mapping,
              'Button',
              appearance,
              ['success'],
            );

            expect(value).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single implicit (should apply from appearance)', () => {
              const value: ThemedStyleType = Service.createStyle(
                mapping,
                'Button',
                appearance,
                ['success'],
                ['active'],
              );

              expect(value).toMatchSnapshot();
            });

            it('* single explicit (should apply own)', () => {
              const value: ThemedStyleType = Service.createStyle(
                mapping,
                'Button',
                appearance,
                ['success'],
                ['active'],
              );

              expect(value).toMatchSnapshot();
            });

            it('* multiple', () => {
              const value: ThemedStyleType = Service.createStyle(
                mapping,
                'Button',
                appearance,
                ['success'],
                ['disabled', 'active'],
              );

              expect(value).toMatchSnapshot();
            });

          });

        });

        describe('* multiple', () => {

          it('* no state', () => {
            const value: ThemedStyleType = Service.createStyle(
              mapping,
              'Button',
              appearance,
              ['success', 'large'],
            );

            expect(value).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single', () => {
              const value: ThemedStyleType = Service.createStyle(
                mapping,
                'Button',
                appearance,
                ['success', 'large'],
                ['active'],
              );

              expect(value).toMatchSnapshot();
            });

            it('* multiple', () => {
              const value: ThemedStyleType = Service.createStyle(
                mapping,
                'Button',
                appearance,
                ['success', 'large'],
                ['disabled', 'active'],
              );

              expect(value).toMatchSnapshot();
            });

          });

        });

      });

      describe('* strict tokens', () => {

        const textPrimaryInverseValue: string = 'white';

        const strict: StrictTheme = {
          'text-primary-inverse': textPrimaryInverseValue,
        };

        it('* maps strict tokens to corresponding values', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            [],
            [],
            strict,
          );

          const { textColor } = value;

          expect(textColor).toEqual(textPrimaryInverseValue);
        });
      });

    });

    describe('* custom appearance', () => {

      const appearance: string = 'outline';

      it('* stateless', () => {
        const value: ThemedStyleType = Service.createStyle(
          mapping,
          'Button',
          'outline',
        );

        expect(value).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* implicit (should apply from default appearance)', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            [],
            ['disabled'],
          );

          expect(value).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            [],
            ['active'],
          );

          expect(value).toMatchSnapshot();
        });

      });

      describe('* with variant', () => {

        it('* implicit (should apply from default appearance)', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            ['large'],
          );

          expect(value).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const value: ThemedStyleType = Service.createStyle(
            mapping,
            'Button',
            appearance,
            ['success'],
          );

          expect(value).toMatchSnapshot();
        });

      });

    });

    describe('* undefined appearance', () => {

      const appearance: string = 'undefined';

      it('* stateless (should apply default appearance)', () => {
        const value: ThemedStyleType = Service.createStyle(
          mapping,
          'Button',
          appearance,
        );

        expect(value).toMatchSnapshot();
      });

    });

  });

});
