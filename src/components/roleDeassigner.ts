/* eslint-disable no-bitwise */
import Components from 'Components';
import FLAGS from 'FLAGS';

const roleDeassigner = {
  loop(): Components[] {
    Object.values(Game.creeps).forEach(crp => {
      if (crp.memory.flags & FLAGS.ROLE_RESET) {
        crp.memory.role = '';
        crp.memory.flags -= FLAGS.ROLE_RESET;
      }
    });
    return [];
  }
};
export default roleDeassigner;
