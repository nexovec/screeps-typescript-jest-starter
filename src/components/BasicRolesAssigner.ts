// FIXME:
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable class-methods-use-this */
const upgraderCount = 0;
const upgraderMaxCount = 0;
class BasicRolesAssigner {

  public loop() {
    // TODO: reset accordingly
    for (const creep of Object.keys(Game.creeps)) {
      for (const src of Game.spawns.Spawn1.room.find(FIND_SOURCES)) {
        if (Memory.creeps[creep].role === '') {
          if (src.availableSlots - src.occupiedSlots > 0) {
            // TODO: pass destination info
            Memory.creeps[creep].role = 'harvester';
            src.occupiedSlots++;
            break;
          } else if (upgraderCount < upgraderMaxCount) {
            Memory.creeps[creep].role = 'upgrader';
          } else {
            Memory.creeps[creep].role = 'builder';
          }
        }
      }
    }
  }

}
export default BasicRolesAssigner;
