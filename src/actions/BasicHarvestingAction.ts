import Action from 'actions/Action';
import SourceWrapper from 'wrappers/SourceWrapper';

class BasicHarvestingAction extends Action {

  private creepId: Id<Creep>;

  private source: SourceWrapper;

  public constructor(creepId: Id<Creep>, source: SourceWrapper) {
    super();
    this.creepId = creepId;
    this.source = source;
  }

  public execute(): boolean {
    const creep = Game.getObjectById(this.creepId);
    const source = Game.getObjectById(this.source.id) as Source;
    if (!creep) { this.isComplete = true; return true; } // creep is dead
    if (creep.harvest(source) === ERR_NOT_IN_RANGE)creep.moveTo(source);
    if (!creep.store.getFreeCapacity()) {
      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(Game.spawns.Spawn1);
      else this.isComplete = true;
    }
    return true;
  }

}
export default BasicHarvestingAction;
