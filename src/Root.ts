import ActionScheduler from "ActionScheduler";
import CreepActions from "CreepActions";

class Root {
    private static instance: Root;
    private constructor() { }
    public static get() {
        if (!Root.instance)
            Root.instance = new Root();
        return Root.instance;
    }
    public loop() {
        Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], _.uniqueId("nex#"))

        let source: Source = Game.spawns.Spawn1.room.find(FIND_SOURCES)[0];
        _.map(Game.creeps, (creep: Creep) => {
            if (creep.reserved) {
                creep.reserved = true;
                CreepActions.basicCreepHarvesting(creep.id, source.id);
            }
        });
        ActionScheduler.get().loop();

    }
}
export default Root;
