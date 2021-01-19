import CreepWrapper from 'wrappers/CreepWrapper';
import SourceWrapper from 'wrappers/SourceWrapper';
import Action from './Action';

class StaticHarvestingAction extends Action {

  public miner: CreepWrapper;

  public hauler: CreepWrapper;

  public source: SourceWrapper;

  public resourceCount = 0;

  public static resourceGoal = 100;

  public constructor(miner: CreepWrapper, hauler: CreepWrapper, source: SourceWrapper) {
    super();
    this.miner = miner;
    this.hauler = hauler;
    this.source = source;
  }

  public execute(): boolean {
    if (!Game.getObjectById(this.miner.id) || !Game.getObjectById(this.hauler.id)) {
      this.source.occupiedSlots--;
      this.isComplete = true;
    }

    // do mining
    if (this.resourceCount >= StaticHarvestingAction.resourceGoal) {
      this.isComplete = true;
      return true;
    }
    const m = Game.getObjectById(this.miner.id) as Creep;
    // const h = Game.getObjectById(this.hauler.id) as Creep;
    const s = Game.getObjectById(this.source.id) as Source;
    if (m.harvest(s) === ERR_NOT_IN_RANGE) m.moveTo(s);
    else this.resourceCount++;
    return true;
  }

}
export default StaticHarvestingAction;
