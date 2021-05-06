/* eslint-disable no-bitwise */
import FLAGS from 'FLAGS';

const roleAssigner = {
  loop() {
    Object.values(Game.creeps).forEach(creep => {
      if (!creep.memory.role || creep.memory.role === '') creep.memory.role = 'harvester';
      if (creep.memory.flags & FLAGS.ROLE_RESET) {
        creep.memory.role = 'upgrader';
        creep.memory.flags -= FLAGS.ROLE_RESET;
      }
    });
  }

};
export default roleAssigner;
