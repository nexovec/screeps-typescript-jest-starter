import Components from 'Components';
import FLAGS from 'FLAGS';

/* eslint-disable no-bitwise */
function upgrade(creep: Creep) {
  if (creep.store[RESOURCE_ENERGY] === 0) {
    if (creep.memory.flags & FLAGS.ROLES_IS_UPGRADING) { creep.memory.flags -= FLAGS.ROLES_IS_UPGRADING; }
    creep.say('🔄 harvest');
    creep.memory.flags |= FLAGS.ROLE_RESET | FLAGS.ROLES_SHOULD_HARVESTER;
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
    creep.memory.flags |= FLAGS.ROLE_RESET;
  }
}
const upgrader = {
  loop(): Components[] {
    Object.values(Game.creeps).forEach((creep: Creep) => {
      if (creep.memory.role === 'upgrader') upgrade(creep);
    });
    return [];
  }
};
export default upgrader;
