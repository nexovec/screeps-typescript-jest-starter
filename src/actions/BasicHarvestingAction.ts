import Action from 'actions/Action';
import SourceWrapper from 'wrappers/SourceWrapper';

class BasicHarvestingAction extends Action {

  private creepId: Id<Creep>;

  private source: SourceWrapper;

  private depo: StructureController | StructureSpawn;

  private depositing: boolean;

  public constructor(creepId: Id<Creep>, source: SourceWrapper) {
    super();
    this.creepId = creepId;
    this.source = source;
    this.depo = Game.spawns.Spawn1;
    this.depositing = false;
  }

  public execute(): boolean {
    const creep = Game.getObjectById(this.creepId);
    const source = Game.getObjectById(this.source.id) as Source;
    const c = Game.spawns.Spawn1.room.controller as StructureController;

    // if creep is dead
    if (!creep) {
      this.isComplete = true;
      return true;
    }

    if (!this.depositing) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
      if (!creep.store.getFreeCapacity()) this.depositing = true;
    }

    // switch to controller upgrading when spawn is full
    // FIXME: not optimal, will agro creeps when not needed
    if (!Game.spawns.Spawn1.store.getFreeCapacity()) {
      this.depo = c;
    }

    if (!this.depositing) return true;
    if (this.depo instanceof StructureSpawn) {
      const attempt = creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
      if (attempt === ERR_NOT_IN_RANGE) creep.moveTo(Game.spawns.Spawn1);
      else this.isComplete = true;
    } else if (this.depo instanceof StructureController) {
      const attempt = creep.upgradeController(c);
      if (attempt === ERR_NOT_IN_RANGE) creep.moveTo(c);
      if (!creep.store.getUsedCapacity()) this.isComplete = true;
    }
    return true;
  }

}
export default BasicHarvestingAction;
