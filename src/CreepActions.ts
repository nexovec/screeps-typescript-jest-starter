import ActionScheduler from 'ActionScheduler';
import BasicHarvestingQueue from 'actions/queues/BasicHarvestingQueue';

class CreepActions {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static basicCreepHarvesting(creepId: Id<Creep>, sourceId: Id<Source>) {
    // ActionScheduler.get().scheduleAction(new BasicHarvestingAction(creepId, sourceId));
    ActionScheduler.get().scheduleAction(new BasicHarvestingQueue(creepId, sourceId));
    return OK;
  }

}
export default CreepActions;
