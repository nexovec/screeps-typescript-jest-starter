import ActionScheduler from 'ActionScheduler';
import BasicHarvestingQueue from 'actions/queues/BasicHarvestingQueue';
import SourceWrapper from 'wrappers/SourceWrapper';

class CreepActions {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static basicCreepHarvesting(creep: Id<Creep>, source: SourceWrapper) {
    // ActionScheduler.get().scheduleAction(new BasicHarvestingAction(creepId, sourceId));
    ActionScheduler.get().scheduleAction(new BasicHarvestingQueue(creep, source));
    return OK;
  }

}
export default CreepActions;
