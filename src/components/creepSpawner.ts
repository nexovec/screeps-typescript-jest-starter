import _ from 'lodash';

const maxCreeps = 6;
const creepSpawner = {
  loop() {
    if (Object.keys(Game.creeps).length < maxCreeps) {
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `nex${_.uniqueId()}`);
    }
  }
};
export default creepSpawner;
