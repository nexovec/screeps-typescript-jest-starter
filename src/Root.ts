/* eslint-disable class-methods-use-this */
import ActionScheduler from 'ActionScheduler';
import CreepActions from 'CreepActions';
import SourceManager from 'managers/SourceManager';
import SourceWrapper from 'wrappers/SourceWrapper';

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
    // TODO: beware, you're overloading the sources
    if (this.sm.allSlots >= Object.keys(Game.creeps).length) {
      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], _.uniqueId('nex#'));
    }
    _.map(Game.creeps, (creep: Creep) => {
      if (!creep.reserved) {
        const s: SourceWrapper | null = this.sm.reserveSourceSlot() as SourceWrapper;
        if (s) {
          creep.reserved = true;
          CreepActions.basicCreepHarvesting(creep.id, s);
        }
      }
    });
    ActionScheduler.get().loop();
  }

}
export default Root;
