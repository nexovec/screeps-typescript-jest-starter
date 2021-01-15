import "lodash";
let cache: { [name: string]: boolean } = {};
// FIXME: probably wrong
Object.defineProperty(Creep.prototype, "reserved", {
    get() {
        if (!cache[this.id])
            cache[this.id] = false;
        return cache[this.id];
    },
    set(val: boolean) {
        cache[this.id] = val;
    }
});
