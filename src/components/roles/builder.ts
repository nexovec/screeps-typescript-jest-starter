/* eslint-disable no-bitwise */
import Components from 'Components';
import FLAGS from 'FLAGS';

const cacheBuilding: {[name: string]: boolean} = {};
function build(creep: Creep) {
  if (!cacheBuilding[creep.id] && creep.store.energy !== 0) cacheBuilding[creep.id] = true;
  if (!creep.store.energy) cacheBuilding[creep.id] = false;
  if (!cacheBuilding[creep.id]) {
    const structures = creep.room.find(FIND_STRUCTURES).filter(stc => hasEnergy(stc));
    // TODO: ask to not dispatch any builders
    if (!structures.length) creep.memory.flags |= FLAGS.ROLE_RESET;
    else if (creep.withdraw(structures[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(structures[0]);
    return;
  }
  const sites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
  if (creep.build(sites[0]) === ERR_NOT_IN_RANGE)creep.moveTo(sites[0]);
  else {
    console.log('nothing to build');
    creep.memory.flags |= FLAGS.ROLE_RESET;
  }
}
function hasEnergy(structure: Structure): boolean {
  if (structure.structureType === STRUCTURE_EXTENSION
      || structure.structureType === STRUCTURE_SPAWN
      || structure.structureType === STRUCTURE_TOWER
  ) {
    const s = structure as StructureExtension | StructureSpawn | StructureTower;
    return s.energy !== 0;
  }
  return false;
}
const builder = {
  loop(): Components[] {
    const sites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
    if (!sites.length) {
      // TODO: ask to not dispatch any builders
      return [];
    }
    Object.values(Game.creeps).forEach(creep => {
      if (creep.memory.role === 'builder')build(creep);
    });
    return [];
  }
};
export default builder;
