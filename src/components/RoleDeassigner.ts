/* eslint-disable no-restricted-syntax */
import FLAGS from 'flags';

class RoleDeassigner {

  // eslint-disable-next-line class-methods-use-this
  public loop() {
    for (const creep of Object.values(Game.creeps)) {
      // eslint-disable-next-line no-bitwise
      if (creep.memory.flags & FLAGS.ROLE_RESET) {
        creep.memory.role = '';
        creep.memory.flags -= FLAGS.ROLE_RESET;
      }
    }
  }

}
export default RoleDeassigner;
