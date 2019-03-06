/**
 * Safely retrieves R value of T object with reducer
 *
 * @param value (T | undefined) - unsafe object which should be processed
 * @param reducer ((T) => R) - `value` processing lambda. Called if `value` is not `undefined`
 *
 * @return (R | undefined) - object returned by `reducer` if `value` is not `undefined`, `undefined` otherwise
 **/
export function safe<T, R>(value: T | undefined, reducer: (value: T) => R): R | undefined {
  if (value) {
    return reducer(value);
  }
  return undefined;
}

/**
 * Maps 2-dim array to 1-dim
 *
 * @param params (T[][]) - 2-dim array
 *
 * @return 1-dim array
 */
export function flatten<T>(params: T[][]): T[] {
  return [].concat(...params);
}

/**
 * Removes all duplicates from array
 *
 * @param params (T[]) - array with possible duplicate values
 *
 * @return (T[]) - processed array
 */
export function noDuplicates<T>(params: T[]): T[] {
  return [...new Set(params)];
}


/**
 * Removes null and undefined values from array
 *
 * @param params (T[]) - array with possible null values
 *
 * @return (T[]) - processed array
 */
export function noNulls<T>(params: T[]): T[] {
  return params.filter(Boolean);
}

/**
 * Returns Object with string keys from array type [string, IndexSignatureBase]
 *
 * @param array like [string, IndexSignatureBase]
 *
 * @return object with string keys and IndexSignatureBase values
 */
export function toObject(array: [string, any][]): any {
  return array.reduce((p, c) => {
    if (p && p.hasOwnProperty(c[0])) {
      p[c[0]] = { ...p[c[0]], ...c[1] };
    } else {
      p[c[0]] = c[1];
    }
    return p;
  }, {});
}
