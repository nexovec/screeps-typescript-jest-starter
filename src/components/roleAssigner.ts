/* eslint-disable no-bitwise */
import Components from 'Components';
import FLAGS from 'FLAGS';

const roleAssigner = {
  loop(): Components[] {
    Object.values(Game.creeps).forEach(creep => {
      if (!creep.memory.role || creep.memory.role === '') creep.memory.role = 'harvester';
      if ((creep.memory.flags & (FLAGS.ROLES_SHOULD_HARVESTER | FLAGS.ROLE_RESET))
      === (FLAGS.ROLE_RESET | FLAGS.ROLES_SHOULD_HARVESTER)) {
        creep.memory.role = 'harvester';
        creep.memory.flags -= FLAGS.ROLE_RESET | FLAGS.ROLES_SHOULD_HARVESTER;
      }
      if (creep.memory.flags & FLAGS.ROLE_RESET) {
        creep.memory.role = 'upgrader';
      }
    });
    return [];
  }

};
export default roleAssigner;
