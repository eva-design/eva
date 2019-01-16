export interface Processor<T, R> {
  process(params: T): R;
}
