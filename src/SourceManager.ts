import SourceWrapper from 'SourceWrapper';

class SourceManager {

    public sources: SourceWrapper[];

    public constructor(room: Room) {
        this.sources = room.find(FIND_SOURCES).map(val => new SourceWrapper(val.id, SourceManager.getSlots(val)));
    }

    public reserveSourceSlot(): SourceWrapper | null{
        for (let i = 0; i < this.sources.length; i++) {
            if (this.sources[i].occupiedSlots < this.sources[i].maxSlots) {
                this.sources[i].occupiedSlots++;
                return this.sources[i];
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
