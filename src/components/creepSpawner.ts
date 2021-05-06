import Components from 'Components';
import _ from 'lodash';

const maxCreeps = 8;
const creepSpawner = {
  loop(): Components[] {
    if (Object.keys(Game.creeps).length < maxCreeps) {
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `nex${_.uniqueId()}`);
    }
    return [];
  }
};
export default creepSpawner;
