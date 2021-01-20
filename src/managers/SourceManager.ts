import SourceWrapper from 'wrappers/SourceWrapper';

class SourceManager {

  public sources: SourceWrapper[];

  public allSlots: number;

  public reserves: number;

  public constructor(room: Room) {
    this.sources = room.find(FIND_SOURCES).map(val => new SourceWrapper(val.id, SourceManager.getSlots(val)));
    this.allSlots = this.sources.reduce((total, val) => total + val.maxSlots, 0);
    this.reserves = this.sources.reduce((total, val) => total + Math.round(val.maxSlots + 2), 0);
  }

  public reserveSourceSlot(): SourceWrapper | null {
    for (let i = 0; i < this.sources.length; i++) {
      const s = this.sources[i];
      if (s.occupiedSlots < s.maxSlots + Math.round((2.0 / 3.0) * s.maxSlots)) {
        s.occupiedSlots++;
        return s;
      }
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  public unreserveSourceSlot(s: SourceWrapper) {
    s.occupiedSlots--;
  }

  public static getImmediateSurroudings(pos: RoomPosition) {
    const res = [];
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) if (!(x === 0 && y === 0)) res.push([pos.x + x, pos.y + y]);
    }
    return res;
  }

  private static getSlots(source: Source) {
    const t = source.room.getTerrain();
    const res = 8 - this.getImmediateSurroudings(source.pos)
    .filter(([x, y]) => t.get(x, y) === TERRAIN_MASK_WALL).length;
    console.log(res);
    return res;
  }

}
export default SourceManager;
