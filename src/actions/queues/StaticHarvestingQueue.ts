import StaticHarvestingAction from 'actions/StaticHasrvestingAction';
import CreepWrapper from 'wrappers/CreepWrapper';
import SourceWrapper from 'wrappers/SourceWrapper';
import ActionQueue from './ActionQueue';

class StaticHarvestingQueue extends ActionQueue {

  public source: SourceWrapper;

  public miner: CreepWrapper;

  public hauler: CreepWrapper;

  public constructor(miner: CreepWrapper, hauler: CreepWrapper, source: SourceWrapper) {
    super();
    this.miner = miner;
    this.hauler = hauler;
    this.source = source;
    for (let i = 0; i < 20; i++) {
      this.actions.push(new StaticHarvestingAction(miner, hauler, source));
    }
  }

  public execute() {
    return super.execute();
  }

}
export default StaticHarvestingQueue;
