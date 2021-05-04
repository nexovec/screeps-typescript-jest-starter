import FLAGS from 'flags';

/* eslint-disable no-bitwise */
export interface Builder extends Creep {
  memory: BuilderMemory;
}
// FIXME: just make this go away, pleeease
interface BuilderMemory extends CreepMemory {
  building: boolean;
  role: 'builder';
}

const roleBuilder = {
  run(creep: Builder) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
      creep.memory.flags |= FLAGS.ROLE_RESET;
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        // FIXME: use flags for this
        (creep.memory as CreepMemory).role = 'upgrader';
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
};

export default roleBuilder;
