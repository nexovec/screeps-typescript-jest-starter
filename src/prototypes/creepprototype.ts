import ErrorMapper from "utils/ErrorMapper";
{
    let cache: { [name: Id<Creep>]: boolean } = {};
    // FIXME: probably wrong
    Object.defineProperty(Creep.prototype, "reserved", () => {
        get(){
            if (!cache[this.id])
                cache[this.id] = false;
            return cache[this.id];
        }
    });
}
