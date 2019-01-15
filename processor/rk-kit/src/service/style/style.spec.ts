import { APPEARANCE_DEFAULT } from '../mapping';
import { StyleMappingType } from './type';
import * as Service from './style.service';
import { mapping } from './style.spec.config';

describe('@style: service methods checks', () => {

  describe('* preprocess', () => {

    it('* normalizes appearance properly', () => {
      const implicitDefault = Service.normalizeAppearance('default');
      const custom = Service.normalizeAppearance('custom');
      const empty = Service.normalizeAppearance('');
      const nullable = Service.normalizeAppearance(undefined);

      expect(implicitDefault).toEqual([
        'default',
      ]);
      expect(custom).toEqual([
        'default',
        'custom',
      ]);
      expect(empty).toEqual([
        'default',
      ]);
      expect(nullable).toEqual([
        'default',
      ]);
    });

    it('* normalizes variants properly', () => {
      const success = Service.normalizeVariants([
        'success',
      ]);
      const successTiny = Service.normalizeVariants([
        'success',
        'tiny',
      ]);
      const withDuplicates = Service.normalizeVariants([
        'success',
        'success',
        'tiny',
      ]);
      const withNulls = Service.normalizeVariants([
        'success',
        undefined,
        'tiny',
        null,
      ]);
      const empty = Service.normalizeVariants([
        '',
      ]);

      expect(success).toEqual([
        'success',
      ]);
      expect(successTiny).toEqual([
        'success',
        'tiny',
      ]);
      expect(withDuplicates).toEqual([
        'success',
        'tiny',
      ]);
      expect(withNulls).toEqual([
        'success',
        'tiny',
      ]);
      expect(withNulls).toEqual([
        'success',
        'tiny',
      ]);
      expect(empty).toEqual([]);
    });

    it('* normalizes states properly', () => {
      const states = [
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

      const regular = Service.normalizeStates(states, calculateStateWeight);
      const withDuplicates = Service.normalizeStates([...states, 'active'], calculateStateWeight);
      const withNulls = Service.normalizeStates([...states, undefined], calculateStateWeight);
      const empty = Service.normalizeStates([], calculateStateWeight);
      const customSeparator = Service.normalizeStates(states, calculateStateWeight, '-');

      expect(regular).toEqual([
        'active',
        'checked',
        'disabled',
        'active.checked',
        'active.disabled',
        'checked.disabled',
        'active.checked.disabled',
      ]);
      expect(withDuplicates).toEqual([
        'active',
        'checked',
        'disabled',
        'active.checked',
        'active.disabled',
        'checked.disabled',
        'active.checked.disabled',
      ]);
      expect(withNulls).toEqual([
        'active',
        'checked',
        'disabled',
        'active.checked',
        'active.disabled',
        'checked.disabled',
        'active.checked.disabled',
      ]);
      expect(empty).toEqual([]);
      expect(customSeparator).toEqual([
        'active',
        'checked',
        'disabled',
        'active-checked',
        'active-disabled',
        'checked-disabled',
        'active-checked-disabled',
      ]);
    });

    describe('* keygen', () => {

      const source: string[] = [
        'default',
        'default.checked',
        'default.success',
        'default.success.checked',
        'default.success.small.checked',
        'default.success.small.checked.active',
      ];

      it('* appearance only', () => {
        const value = Service.findStyleKey(source, [
          'default',
        ]);

        expect(value).toEqual('default');
      });

      it('* appearance and state', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'checked',
        ]);

        expect(value).toEqual('default.checked');
      });

      it('* appearance and variant', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'success',
        ]);

        expect(value).toEqual('default.success');
      });

      it('* appearance and variant and state', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'success',
          'checked',
        ]);

        expect(value).toEqual('default.success.checked');
      });

      it('* appearance and variants and state', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'success',
          'small',
          'checked',
        ]);

        expect(value).toEqual('default.success.small.checked');
      });

      it('* appearance and variants and states', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'success',
          'small',
          'checked',
          'active',
        ]);

        expect(value).toEqual('default.success.small.checked.active');
      });

      it('* unordered', () => {
        const value = Service.findStyleKey(source, [
          'default',
          'checked',
          'small',
          'success',
          'active',
        ]);

        expect(value).toEqual('default.success.small.checked.active');
      });

      it('* with undefined in config', () => {
        const value = Service.findStyleKey(source, [
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

      const appearance = APPEARANCE_DEFAULT;

      it('* no variant and no state', () => {
        const style = Service.createStyle(mapping, 'Test');
        expect(style).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* single', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            [],
            ['active'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* multiple', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            [],
            ['checked', 'active'],
          );

          expect(style).toMatchSnapshot();
        });
      });

      describe('* with variant', () => {

        describe('* single', () => {

          it('* no state', () => {
            const style = Service.createStyle(
              mapping,
              'Test',
              appearance,
              ['success'],
            );

            expect(style).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single implicit (should apply from appearance)', () => {
              const style = Service.createStyle(
                mapping,
                'Test',
                appearance,
                ['success'],
                ['active'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* single explicit (should apply own)', () => {
              const style = Service.createStyle(
                mapping,
                'Test',
                appearance,
                ['success'],
                ['checked'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* multiple', () => {
              const style = Service.createStyle(
                mapping,
                'Test',
                appearance,
                ['success'],
                ['checked', 'active'],
              );

              expect(style).toMatchSnapshot();
            });

          });

        });

        describe('* multiple', () => {

          it('* no state', () => {
            const style = Service.createStyle(
              mapping,
              'Test',
              appearance,
              ['success', 'big'],
            );

            expect(style).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single', () => {
              const style = Service.createStyle(
                mapping,
                'Test',
                appearance,
                ['success', 'big'],
                ['active'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* multiple', () => {
              const style = Service.createStyle(
                mapping,
                'Test',
                appearance,
                ['success', 'big'],
                ['checked', 'active'],
              );

              expect(style).toMatchSnapshot();
            });

          });

        });

      });

    });

    describe('* custom appearance', () => {

      const appearance = 'custom';

      it('* no variant and no state', () => {
        const style = Service.createStyle(mapping, 'Test', 'custom');

        expect(style).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* implicit (should apply from default appearance)', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            [],
            ['checked'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            [],
            ['active'],
          );

          expect(style).toMatchSnapshot();
        });

      });

      describe('* with variant', () => {

        it('* implicit (should apply from default appearance)', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            ['big'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const style = Service.createStyle(
            mapping,
            'Test',
            appearance,
            ['success'],
          );

          expect(style).toMatchSnapshot();
        });

      });

    });

    describe('* undefined appearance', () => {

      const appearance = 'undefined';

      it('* no variant and no state (should apply default appearance)', () => {
        const style = Service.createStyle(mapping, 'Test', appearance);

        expect(style).toMatchSnapshot();
      });

    });

  });

  describe('* all styles', () => {

    it('* create all styles for Test component', () => {
      const styles: StyleMappingType[] = Service.createAllStyles(
        mapping,
        'Test',
        'custom',
        ['success'],
        ['active'],
      );

      expect(styles).toMatchSnapshot();
    });

    it('* create all styles for Test w/o variants', () => {
      const styles: StyleMappingType[] = Service.createAllStyles(
        mapping,
        'Test',
        'custom',
        [],
        ['active'],
      );

      expect(styles).toMatchSnapshot();
    });

  });

  describe('* get style', () => {
    const value: StyleMappingType = Service.getStyle(
      mapping,
      'Test',
      'custom',
      ['success'],
      ['active'],
    );
    expect(value).toMatchSnapshot();
  });

  describe('* get style unexpected', () => {
    const value: StyleMappingType = Service.getStyle(
      mapping,
      'Test',
      'undefined',
      ['success'],
      ['active'],
    );
    expect(value).toBeUndefined();
  });

});
