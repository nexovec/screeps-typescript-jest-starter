/* eslint-disable max-len */
import UUID from '../UUID';
import Task from './Task';

class TaskFactory {

    public static getSpawningTask(): Task {
        return new Task('Spawn worker 1', [], [(): boolean => {
            const res = Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `nex#${new UUID().toString()}`);
            if (res === OK) { return true; }
            return false;
        }]);
    }

    public static getHarvestingTask() {
        return new Task('Harvest energy', [], [(): boolean => {
            if (Object.keys(Game.creeps).length === 0) {
                console.error("wtf u don't have any workers");
                return false;
            }
            return true;
        }, (task: Task) => { // attempt harvesting
            const res = _.map(Game.creeps,
                (creep: Creep): [string, number] => [creep.name, creep
                    .harvest(Game.spawns.Spawn1.room.find(FIND_SOURCES)[0])]);
            // severely retarded

            const CREEP_NAME = 0;
            const RESULT = 1;
            res.filter((val): boolean => { // get to source if can't harvest
                if (val[RESULT] === ERR_NOT_IN_RANGE) {
                    if (task.data.upgrading) if (task.data.upgrading === 'yes') return false;
                    Game.creeps[val[CREEP_NAME]].moveTo(Game.spawns.Spawn1.room.find(FIND_SOURCES)[0]);
                    // slightly icky I know
                } return false;
            });
            // eslint-disable-next-line array-callback-return
            res.map((val: [string, number]): void => { // upgrader code
                const c = Game.creeps[val[CREEP_NAME]];
                if (c.store.getFreeCapacity() === 0) {
                    if (c.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) c.moveTo(Game.spawns.Spawn1);
                    if (c.room.find(FIND_MY_SPAWNS)[0].store.getFreeCapacity(RESOURCE_ENERGY) === 0) task.data.upgrading = 'yes';
                }
                if (task.data.upgrading === 'yes') {
                    if (c.store.getUsedCapacity(RESOURCE_ENERGY) === 0) task.data.upgrading = 'no';
                    const upgRes = c.upgradeController(c.room.controller as StructureController);
                    if (upgRes === ERR_NOT_IN_RANGE) c.moveTo(c.room.controller as StructureController);
                }
            });
            return false;
        }]);
    }

}
export default TaskFactory;
