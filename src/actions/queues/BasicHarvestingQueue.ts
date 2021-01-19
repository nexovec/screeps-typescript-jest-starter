import BasicHarvestingAction from 'actions/BasicHarvestingAction';
import CreepWrapper from 'wrappers/CreepWrapper';
import SourceWrapper from '../../wrappers/SourceWrapper';
import ActionQueue from './ActionQueue';

class BasicHarvestingQueue extends ActionQueue {

  public creep: CreepWrapper;

  public source: SourceWrapper;

  public constructor(creep: CreepWrapper, source: SourceWrapper) {
    super();
    this.creep = creep;
    this.source = source;
    for (let i = 0; i < 20; i++) this.actions.push(new BasicHarvestingAction(creep, source));
    // TODO: send extra creep to each source to cover for absence, make him switch with more productive creep
    creep.reserved = true;
    // FIXME: this needs to be set to false somewhere
  }

  public execute() {
    if (!Game.getObjectById(this.creep.id)) {
      this.source.occupiedSlots--;
      this.isComplete = true; // TODO: make CreepWrapper.die() method
    }
    return super.execute();
  }

}
export default BasicHarvestingQueue;
