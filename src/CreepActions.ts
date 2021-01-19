import ActionScheduler from 'ActionScheduler';
import BasicHarvestingQueue from 'actions/queues/BasicHarvestingQueue';
import SourceWrapper from 'wrappers/SourceWrapper';
import CreepWrapper from 'wrappers/CreepWrapper';
import StaticHarvestingQueue from 'actions/queues/StaticHarvestingQueue';
import HaulingQueue from 'actions/queues/HaulingQueue';

class CreepActions {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static basicCreepHarvesting(creep: Id<Creep>, source: SourceWrapper) {
    // ActionScheduler.get().scheduleAction(new BasicHarvestingAction(creepId, sourceId));
    ActionScheduler.get().scheduleAction(new BasicHarvestingQueue(creep, source));
    return OK;
  }

  public static staticCreepHarvesting(creep: CreepWrapper, hauler: CreepWrapper, source: SourceWrapper) {
    // TODO: ensure the source has an attached container
    ActionScheduler.get().scheduleAction(new StaticHarvestingQueue(creep, hauler, source));
  }

  public static creepHauling(hauler: CreepWrapper, room: Room) {
    ActionScheduler.get().scheduleAction(new HaulingQueue(hauler, room));
  }

}
export default CreepActions;
