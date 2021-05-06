/* eslint-disable no-bitwise */
import FLAGS from 'FLAGS';

const roleDeassigner = {
  loop() {
    Object.values(Game.creeps).forEach(crp => {
      if (crp.memory.flags & FLAGS.ROLE_RESET) {
        crp.memory.role = '';
        crp.memory.flags -= FLAGS.ROLE_RESET;
      }
    });
  }
};
export default roleDeassigner;
