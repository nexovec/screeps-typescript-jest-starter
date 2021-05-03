export {};
const cacheAvailableSlots: {[name: string]: number} = {};
const cacheOccupiedSlots: {[name: string]: number} = {};
function getSlots() {
  return 3;
}
Object.defineProperty(Source.prototype, 'availableSlots', {
  get(): number {
    if (!cacheAvailableSlots[this.id])cacheAvailableSlots[this.id] = getSlots();
    return cacheAvailableSlots[this.id];
  }
});
Object.defineProperty(Source.prototype, 'occupiedSlots', {
  get(): number {
    if (!cacheOccupiedSlots[this.id])cacheOccupiedSlots[this.id] = 0;
    return cacheOccupiedSlots[this.id];
  },
  set(num: number) {
    cacheOccupiedSlots[this.id] = num;
  }
});
