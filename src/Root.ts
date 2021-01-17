/* eslint-disable class-methods-use-this */
import ActionScheduler from 'ActionScheduler';
import CreepActions from 'CreepActions';
import SourceManager from 'managers/SourceManager';
import SourceWrapper from 'wrappers/SourceWrapper';

class Root {

  private static instance: Root;

  private sm: SourceManager;

  private constructor() {
    this.sm = new SourceManager(Game.spawns.Spawn1.room);
  }

  public static get() {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

  public loop() {
    // TODO: beware, you're overloading the sources
    if (!Game.spawns.Spawn1.room?.controller?.level) console.log('wtf RCL 0??');
    const RCL = (Game.spawns.Spawn1.room.controller as StructureController).level;
    const spawn = Game.spawns.Spawn1;

    if (RCL >= 1) {
      if (this.sm.allSlots + this.sm.reserves > Object.keys(Game.creeps).length) {
        Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], _.uniqueId('nex#'));
      }
      _.map(Game.creeps, (creep: Creep) => {
        if (!creep.reserved) {
          const s: SourceWrapper | null = this.sm.reserveSourceSlot() as SourceWrapper;
          if (s) {
            creep.reserved = true;
            CreepActions.basicCreepHarvesting(creep.id, s);
          }
        }
      });
    }
    if (RCL >= 2) {
      // TODO: construction sites for roads to sources
      const r = spawn.room;
      // road sites around the spawn
      SourceManager.getImmediateSurroudings(spawn.pos)
      .filter(([x, y]) => r.getTerrain().get(x, y) !== TERRAIN_MASK_WALL)
      .map(([x, y]) => r.createConstructionSite(x, y, STRUCTURE_ROAD));
      // road sites to sources
      this.sm.sources
      .map(val => Game.getObjectById(val.id) as Source)
      .map(val => PathFinder.search(spawn.pos, val.pos, { swampCost: 1 }).path)
      .map(val => val
        .map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD)));

      // road sites from controller to spawn
      PathFinder.search(r.controller?.pos as RoomPosition, spawn.pos, { swampCost: 1 }).path
      .map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));

      // add controller to source road sites if that path is efficient
      this.sm.sources
      .map(val => Game.getObjectById(val.id) as Source)
      .map(val => {
        const bypass = PathFinder.search(spawn.pos, r.controller?.pos as RoomPosition, { swampCost: 1 });
        const home = PathFinder.search(spawn.pos, val.pos, { swampCost: 1 });
        const direct = PathFinder.search(r.controller?.pos as RoomPosition, val.pos, { swampCost: 1 });
        if (bypass.cost + home.cost > (4.0 / 3.0) * direct.cost) {
        // if (bypass.cost > direct.cost) {
          direct.path
            .map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
        }
        return true;
      });
      // TODO: construction sites for extensions with A*
      // TODO: build extensions
      // TODO: build roads to sources
    }
    ActionScheduler.get().loop();
  }

}
export default Root;
