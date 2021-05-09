/* eslint-disable no-bitwise */
import Components from 'Components';
import FLAGS from 'FLAGS';

const roleAssigner = {
  loop(): Components[] {
    Object.values(Game.creeps).forEach(creep => {
      // FIXME: count harvesters, so there isn't too many
      if (!creep.memory.role || creep.memory.role === '') creep.memory.role = 'harvester';
      if (creep.memory.role === 'builder' && creep.memory.flags & FLAGS.ROLE_RESET) {
        creep.memory.role = 'harvester';
      } else if (creep.memory.role === 'harvester' && creep.memory.flags & FLAGS.ROLE_RESET) {
        creep.memory.role = 'upgrader';
      } else if (creep.memory.role === 'upgrader' && creep.memory.flags & FLAGS.ROLE_RESET) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        Memory.components[Components.BUILDER].hasComponents
          ? creep.memory.role = 'builder'
          : creep.memory.role = 'harvester';
      }
      if (creep.memory.flags & FLAGS.ROLE_RESET) { creep.memory.flags -= FLAGS.ROLE_RESET; }
    });
    return [];
  }

};
export default roleAssigner;
