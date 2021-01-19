import HaulingAction from 'actions/HaulingAction';
import ActionScheduler from 'ActionScheduler';
import CreepWrapper from 'wrappers/CreepWrapper';
import ActionQueue from './ActionQueue';

class HaulingQueue extends ActionQueue {

  public constructor(hauler: CreepWrapper, room: Room) {
    super();
    for (let i = 0; i < 50; i++) ActionScheduler.get().scheduleAction(new HaulingAction(hauler, room));
  }

  public execute() {
    return super.execute();
  }

}
export default HaulingQueue;
