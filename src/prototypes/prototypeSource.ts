export {};
const cacheAvailable: {[sourceId: string]: number} = {};
const cacheOccupied: {[sourceId: string]: number} = {};
function getAvailableWorkSpace(source: Source) {
  // TODO:
  return 3;
}
Object.defineProperty(Source.prototype, 'availableWorkSpace', {
  get() {
    if (cacheAvailable[this.id] === undefined)cacheAvailable[this.id] = getAvailableWorkSpace(this);
    return cacheAvailable[this.id];
  },
  set() {
    throw new Error('Source.availableWorkSpace is readonly!!');
  }
});
Object.defineProperty(Source.prototype, 'occupiedWorkSpace', {
  get() {
    if (cacheOccupied[this.id] === undefined)cacheOccupied[this.id] = 0;
    return cacheOccupied[this.id];
  },
  set(num: number) {
    cacheOccupied[this.id] = num;
  }
});
