import _ from 'lodash';

const maxCreeps = 7;
class BasicSpawner {

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  public constructor() {

  }

  // eslint-disable-next-line class-methods-use-this
  public loop() {
    if (Object.keys(Game.creeps).length < maxCreeps) {
      Game.spawns.Spawn1.spawnCreep([WORK, MOVE, CARRY], `Samson aka #${_.uniqueId()}.`);
    }
  }

}
export default BasicSpawner;
