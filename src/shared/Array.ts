export {};

declare global {
  interface Array<T> {
    get(field: string, value: string): IGetResult;
  }
}

interface IGetResult {
  item: object;
  index: number;
}

Array.prototype.get = function(field: string, value: string) {
  let index = this.findIndex(x => x[field] === value);
  return { item: this[index], index: index };
};
