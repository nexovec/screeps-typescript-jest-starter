import HaulingAction from 'actions/HaulingAction';
import ActionScheduler from 'ActionScheduler';
import CreepWrapper from 'wrappers/CreepWrapper';
import ActionQueue from './ActionQueue';

class HaulingQueue extends ActionQueue {

  public hauler: CreepWrapper;

  public constructor(hauler: CreepWrapper, room: Room) {
    super();
    this.hauler = hauler;
    for (let i = 0; i < 50; i++) ActionScheduler.get().scheduleAction(new HaulingAction(hauler, room));
  }

  public execute() {
    console.log("I'm a hauling queue");
    if (!Game.getObjectById(this.hauler.id)) {
      this.isComplete = true;
      this.hauler.data.performing = 'dead';
      return true;
    }
    return super.execute();
  }

}
export default HaulingQueue;
