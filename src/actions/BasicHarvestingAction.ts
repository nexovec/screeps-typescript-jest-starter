import Action from 'actions/Action';
import CreepWrapper from 'wrappers/CreepWrapper';
import SourceWrapper from 'wrappers/SourceWrapper';

class BasicHarvestingAction extends Action {

  private creep: CreepWrapper;

  private source: SourceWrapper;

  private depo: StructureController | StructureSpawn;

  private depositing: boolean;

  public constructor(creep: CreepWrapper, source: SourceWrapper) {
    super();
    this.creep = creep;
    this.source = source;
    this.depo = Game.spawns.Spawn1;
    this.depositing = false;
    this.creep.reserved = true;
    this.creep.data.performing = 'harvesting';
  }

  public execute(): boolean {
    console.log("I'm a harvester");
    const creep = Game.getObjectById(this.creep.id);
    const source = Game.getObjectById(this.source.id) as Source;
    const c = Game.spawns.Spawn1.room.controller as StructureController;

    // if no creep
    if (this.creep.data.performing === 'spawning') {
      console.log('spawning a creep!');
      if (creep) this.creep.data.performing = 'harvesting';
      else { return true; }
    } if (!creep) {
        this.creep.data.performing = 'dead';
        this.isComplete = true;
        console.log('harvester died!');
        return true;
      }
      this.creep.data.performing = 'harvesting';

    if (!this.depositing) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
      if (!creep.store.getFreeCapacity()) this.depositing = true;
    }

    // switch to controller upgrading when spawn is full
    // NOTE: not optimal, will agro creeps when not needed
    if (Game.spawns.Spawn1.store.energy === 300) {
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
