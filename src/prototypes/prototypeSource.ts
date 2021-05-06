export {};
const cacheAvailable: {[sourceId: string]: number} = {};
const cacheOccupied: {[sourceId: string]: number} = {};
function getImmediateSurroudings(pos: RoomPosition) {
  const res = [];
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) if (!(x === 0 && y === 0)) res.push([pos.x + x, pos.y + y]);
  }
  return res;
}

function getAvailableWorkSpace(source: Source) {
  const t = source.room.getTerrain();
  const res = 8 - getImmediateSurroudings(source.pos)
    .filter(([x, y]) => t.get(x, y) === TERRAIN_MASK_WALL).length;
  console.log(res);
  return res;
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
