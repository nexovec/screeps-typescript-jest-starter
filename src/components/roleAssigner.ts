/* eslint-disable no-bitwise */
import Components from 'Components';
import FLAGS from 'FLAGS';

const roleAssigner = {
  loop(): Components[] {
    Object.values(Game.creeps).forEach(creep => {
      if (!creep.memory.role || creep.memory.role === '') creep.memory.role = 'harvester';
      if (creep.memory.flags & FLAGS.ROLES_SHOULD_UPGRADER) {
        creep.memory.role = 'upgrader';
        creep.memory.flags -= FLAGS.ROLES_SHOULD_UPGRADER;
      }
    });
    return [];
  }

};
export default roleAssigner;
