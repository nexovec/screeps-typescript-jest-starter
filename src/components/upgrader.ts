import FLAGS from 'FLAGS';

/* eslint-disable no-bitwise */
function upgrade(creep: Creep) {
  if (creep.memory.flags & FLAGS.ROLES_IS_UPGRADING && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.flags -= FLAGS.ROLES_IS_UPGRADING;
    creep.say('🔄 harvest');
  }
  if (!(creep.memory.flags & FLAGS.ROLES_IS_UPGRADING) && creep.store.getFreeCapacity() === 0) {
    creep.memory.flags |= FLAGS.ROLES_IS_UPGRADING;
    creep.say('⚡ upgrade');
  }

  if (creep.memory.flags & FLAGS.ROLES_IS_UPGRADING) {
    if (creep.room.controller) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  } else {
    const sources = creep.room.find(FIND_SOURCES);
    // FIXME: redirect to harvesting
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }
}
const upgrader = {
  loop() {
    Object.values(Game.creeps).forEach((creep: Creep) => {
      if (creep.memory.role === 'upgrader') upgrade(creep);
    });
  }
};
export default upgrader;
