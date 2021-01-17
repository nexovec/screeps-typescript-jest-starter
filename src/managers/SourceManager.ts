import SourceWrapper from 'wrappers/SourceWrapper';

class SourceManager {

    public sources: SourceWrapper[];

    public allSlots: number;

    public reserve: number;

    public constructor(room: Room) {
        this.sources = room.find(FIND_SOURCES).map(val => new SourceWrapper(val.id, SourceManager.getSlots(val)));
        this.allSlots = this.sources.reduce((total, val) => total + val.maxSlots, 0);
        this.reserve = 1;
    }

    public reserveSourceSlot(): SourceWrapper | null{
        for (let i = 0; i < this.sources.length; i++) {
            // TODO: temporary! you're overloading the sources!
            const s = this.sources[i];
            if (s.occupiedSlots <= s.maxSlots + Math.round(this.reserve * (2.0 / 3.0) * s.maxSlots)) {
                s.occupiedSlots++;
                return s;
            }
        }
        return null;
    }

    private static getImmediateSurroudings(pos: RoomPosition) {
        const res = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) if (!(x === 0 && y === 0)) res.push([pos.x + x, pos.y + y]);
        }
        return res;
    }

    private static getSlots(source: Source) {
        const t = source.room.getTerrain();
        const res = 8
        - this.getImmediateSurroudings(source.pos).filter(([x, y]) => t.get(x, y) === TERRAIN_MASK_WALL).length;
        console.log(res);
        return res;
    }

}
export default SourceManager;
