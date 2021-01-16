/* eslint-disable class-methods-use-this */
import ActionScheduler from 'ActionScheduler';
import CreepActions from 'CreepActions';
import SourceManager from 'SourceManager';

class Root {

  private static instance: Root;

  private sm: SourceManager;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    this.sm = new SourceManager(Game.spawns.Spawn1.room);
  }

  public static get() {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

  public loop() {
    Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], _.uniqueId('nex#'));

    const source: Source = Game.spawns.Spawn1.room.find(FIND_SOURCES)[0];
    _.map(Game.creeps, (creep: Creep) => {
      if (!creep.reserved) {
        creep.reserved = true;
        // CreepActions.basicCreepHarvesting(creep.id, source.id);
        // TODO: unreserve the slot
        const s = this.sm.reserveSourceSlot();
        if (s) CreepActions.basicCreepHarvesting(creep.id, s?.id);
      }
    });
    ActionScheduler.get().loop();
  }

}
export default Root;
