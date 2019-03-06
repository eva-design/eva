import * as Service from './common.service';

describe('@common: service method checks', () => {

  describe('* safe', () => {

    it('* undefined value param', () => {
      const value = Service.safe(undefined, (safeValue) => {
        return safeValue.toString();
      });

      expect(value).toBeUndefined();
    });

    it('* defined value param', () => {
      const value = Service.safe(42, (safeValue) => {
        return safeValue.toString();
      });

      expect(value).toEqual('42');
    });

  });

  describe('* flatten', () => {

    it('* 2-dim array', () => {
      const value = Service.flatten([[1, 2, 3], [4, 5, 6]]);

      expect(value).toEqual([1, 2, 3, 4, 5, 6]);
    });

  });

  describe('* noDuplicates', () => {

    it('* with duplicates', () => {
      const value = Service.noDuplicates([1, 2, 3, 3, 4]);

      expect(value).toEqual([1, 2, 3, 4]);
    });

    it('* with no duplicates', () => {
      const value = Service.noDuplicates([1, 2, 3, 4]);

      expect(value).toEqual([1, 2, 3, 4]);
    });

  });

  describe('* noNulls', () => {

    it('* with nulls', () => {
      const value = Service.noNulls([1, 2, null, undefined, 3, 4]);

      expect(value).toEqual([1, 2, 3, 4]);
    });

    it('* with no nulls', () => {
      const value = Service.noNulls([1, 2, 3, 4]);

      expect(value).toEqual([1, 2, 3, 4]);
    });

  });

  describe('* toObject', () => {

    it('* array', () => {
      const value = Service.toObject([
        ['1', { a: 1, b: 1 }], ['2', { x: 1, y: 1 }], ['1', { c: 1, d: 1 }],
      ]);

      expect(value).toEqual({
        '1': { a: 1, b: 1, c: 1, d: 1 },
        '2': { x: 1, y: 1 },
      });
    });

    it('* empty array', () => {
      const value = Service.toObject([]);

      expect(value).toEqual({});
    });

  });

});
