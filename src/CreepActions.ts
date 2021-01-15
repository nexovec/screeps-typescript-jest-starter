import ActionScheduler from 'ActionScheduler';
import BasicHarvestingAction from 'actions/BasicHarvestingAction';

class CreepActions {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static basicCreepHarvesting(creepId: Id<Creep>, sourceId: Id<Source>) {
    ActionScheduler.get().scheduleAction(new BasicHarvestingAction(creepId, sourceId));
    return OK;
  }

}
export default CreepActions;
