const cache: {[id: string]: Id<Source>} = {};
const roleHarvester = {

  run(creep: Creep) {
    if (!cache[creep.id]) {
      const sources = creep.room.find(FIND_SOURCES);
      cache[creep.id] = sources[0].id;
      sources[0].occupiedSlots++;
    }
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.harvest(Game.getObjectById(cache[creep.id]) as Source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(cache[creep.id]) as Source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, { filter: s => this.isToBeFilled(s) });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        // FIXME: use flags for this
        creep.memory.role = 'builder';
        (Game.getObjectById(cache[creep.id]) as Source).occupiedSlots--;
        delete cache[creep.id];
      }
    }
  },

  isToBeFilled(structure: Structure): boolean {
    if (structure.structureType === STRUCTURE_EXTENSION
      || structure.structureType === STRUCTURE_SPAWN
      || structure.structureType === STRUCTURE_TOWER
    ) {
      const s = structure as StructureExtension | StructureSpawn | StructureTower;
      return s.energy < s.energyCapacity;
    }
    return false;
  }

};

export default roleHarvester;
