import CreepWrapper from 'wrappers/CreepWrapper';
import Action from './Action';

class HaulingAction extends Action {

  private room: Room;

  public creep: CreepWrapper;

  private siteId: Id<ConstructionSite> | null;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  public constructor(creep: CreepWrapper, room: Room) {
    super();
    // NOTE: haulers build and haul for now
    this.room = room;
    this.creep = creep;
    this.siteId = null;
    creep.reserved = true;
    creep.data.performing = 'hauling';
  }

  public execute(): boolean {
    const creep = Game.getObjectById(this.creep.id);
    console.log(`I'm a hauler ${creep?.name}`);
    if (!creep) {
      console.log('Hauler died!');
      this.creep.data.performing = 'dead';
      this.isComplete = true;
      return true;
    }

    // building
    const sites = this.room.find(FIND_CONSTRUCTION_SITES);
    // NOTE: slow
    if (!this.siteId) {
      // sites.sort((val1, val2) => {
      //   const cost1 = PathFinder.search(creep.pos, val1.pos);
      //   const cost2 = PathFinder.search(creep.pos, val2.pos);
      //   if (cost1 === cost2) return 0;
      //   if (cost1 <= cost2) return -1;
      //   return 1;
      // });
      if (!sites.length) {
        console.log('no construction sites!');
        return true;
      }
      this.siteId = sites[0].id;
    }
    const obj = Game.getObjectById(this.siteId);
    if (!obj) {
      this.isComplete = true;
      return true;
    }
    // NOTE: relies on Spawn1
    // NOTE: is greedy, will deplete spawn energy even if there's not enough creeps
    if (creep.store.getUsedCapacity() === 0) {
      if (creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(Game.spawns.Spawn1);
    } else if (creep.build(obj) === ERR_NOT_IN_RANGE) {
      creep.moveTo(obj);
    }

    // NOTE: this doesn't really work yet
    // hauling dropped resources
    const resources = this.room.find(FIND_DROPPED_RESOURCES);
    if (resources.length) {
      console.log('There are dropped resources');
      resources.map(val => {
        if (creep?.pickup(val) === ERR_NOT_IN_RANGE) creep.moveTo(val);
        return creep;
      });
    }
    return true;
  }

}
export default HaulingAction;
