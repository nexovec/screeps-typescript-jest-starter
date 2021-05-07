import Components from 'Components';
import _ from 'lodash';
import helperFunctions from 'utils/helperFunctions';

const maxCreeps = 105;
const extras = {
  preferredExtraHarvesters: Game.spawns.Spawn1.room.find(FIND_SOURCES)
    .map(src => helperFunctions.getExtraHarvestersPerSource(src)).reduce((total: number, c: number) => total + c),
  preferredExtraBuilders: 1,
  preferredExtraUpgraders: 1
};
function getAllSourceSlots() {
  return Game.spawns.Spawn1.room.find(FIND_SOURCES)
    .map(p => p.availableWorkSpace).reduce((prev: number, current: number) => prev + current);
}

const creepSpawner = {
  loop(): Components[] {
    const creepCount = Object.keys(Game.creeps).length;
    if (creepCount >= maxCreeps) return [];
    if (getAllSourceSlots() + Object.values(extras).reduce((p: number, c: number) => p + c) > creepCount) {
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], `nex${_.uniqueId()}`);
    }
    return [];
  }
};
export default creepSpawner;
