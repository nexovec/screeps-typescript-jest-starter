import Action from 'actions/Action';

class BasicHarvestingAction extends Action {

  private creepId: Id<Creep>;

  private sourceId: Id<Source>;

  public constructor(creepId: Id<Creep>, sourceId: Id<Source>) {
    super(false);
    this.creepId = creepId;
    this.sourceId = sourceId;
  }

  public execute(): boolean {
    const creep = Game.getObjectById(this.creepId);
    const source = Game.getObjectById(this.sourceId) as Source;
    if (!creep) { this.isComplete = true; return true; } // if creep is dead
    if (creep.harvest(source) === ERR_NOT_IN_RANGE)creep.moveTo(source);
    if (!creep.store.getFreeCapacity()) {
      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(Game.spawns.Spawn1);
    }
    // TODO: ensure update of this.isComplete
    return true;
  }

}
export default BasicHarvestingAction;
