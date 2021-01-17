class SourceWrapper {

    public id: Id<Source>;

    public maxSlots: number;

    public occupiedSlots: number;

    public constructor(id: Id<Source>, maxSlots: number) {
        this.id = id;
        this.maxSlots = maxSlots;
        this.occupiedSlots = 0;
    }

} export default SourceWrapper;
