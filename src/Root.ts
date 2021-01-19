/* eslint-disable no-lone-blocks */
/* eslint-disable class-methods-use-this */
import ActionScheduler from 'ActionScheduler';
import CreepActions from 'CreepActions';
import BuildingManager from 'managers/BuildingManager';
import SourceManager from 'managers/SourceManager';
import CreepPool from 'wrappers/CreepPool';
import CreepWrapper from 'wrappers/CreepWrapper';
import SourceWrapper from 'wrappers/SourceWrapper';

class Root {

  private static instance: Root;

  private sm: SourceManager;

  private bm: BuildingManager;

  private cp: CreepPool;

  private designated: boolean;

  private constructionSites: ConstructionSite<BuildableStructureConstant>[];

  private constructor() {
    this.sm = new SourceManager(Game.spawns.Spawn1.room);
    this.bm = new BuildingManager(this.sm);
    this.cp = new CreepPool();
    this.designated = false;
    this.constructionSites = [];
  }

  public static get() {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

  public spawnCreepIfNCapped(n: number): CreepWrapper | null {
    if (n > Object.keys(Game.creeps).length) {
      const name = _.uniqueId('nex#');
      const code = Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], name);
      if (code === OK) {
        const selection = _.filter(Game.creeps, val => val.name === name);
        if (!selection.length) throw new Error('How does this even not work??');
        console.log(JSON.stringify(selection));
        const creepId = selection[0].id;
        this.cp.addCreep(creepId); // TODO: you'll forget to do this everytime you spawn
        return this.cp.getCreep(creepId);
      }
    }
    return null;
  }

  public loop() {
    // NOTE: beware, you're overloading the sources
    if (!Game.spawns.Spawn1.room?.controller?.level) console.log('wtf RCL 0??');
    const RCL = (Game.spawns.Spawn1.room.controller as StructureController).level;
    const spawn = Game.spawns.Spawn1;
    const r = spawn.room;

    if (RCL >= 1) {
      this.spawnCreepIfNCapped(this.sm.allSlots + this.sm.reserves);

      // scheduling harvesters
      _.map(Game.creeps, (creep: Creep) => {
        if (!this.cp.containsCreep(creep.id)) this.cp.addCreep(creep.id);
        if (!creep.reserved) {
          // TODO: make this use CreepPool for unnreserved creep requests
          const s: SourceWrapper | null = this.sm.reserveSourceSlot() as SourceWrapper;
          if (s) {
            this.cp.makeCreepReserved(creep.id);
            CreepActions.basicCreepHarvesting(creep.id, s);
          }
        }
      });

      // scheduling haulers
      // const hauler = this.spawnCreepIfNCapped(this.sm.allSlots + this.sm.reserves + 2);
      // if (hauler) {
      //   this.cp.makeCreepReserved(hauler.id);
      //   CreepActions.creepHauling(hauler, r);
      // }
    }
    if (RCL >= 2) {
      if (!this.designated) {
        // road sites around the spawn
        {
          SourceManager.getImmediateSurroudings(spawn.pos)
            .filter(([x, y]) => r.getTerrain().get(x, y) !== TERRAIN_MASK_WALL)
            .map(([x, y]) => r.createConstructionSite(x, y, STRUCTURE_ROAD));
        }

        const rg = (val: RoomPosition) => ({ pos: val, range: 1 });
        // road sites to sources
        this.sm.sources
          .map(val => Game.getObjectById(val.id) as Source)
          .map(val => PathFinder.search(spawn.pos, rg(val.pos), { swampCost: 1 }).path)
          .map(val => val.map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD)));

        // road sites from controller to spawn
        PathFinder.search(r.controller?.pos as RoomPosition, spawn.pos, { swampCost: 1 }).path
        .map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));

        // add controller to source road sites if that path is efficient
        this.sm.sources
          .map(val => Game.getObjectById(val.id) as Source)
          .map(val => {
            const bypass = PathFinder.search(spawn.pos, r.controller?.pos as RoomPosition, { swampCost: 1 });
            const home = PathFinder.search(spawn.pos, rg(val.pos), { swampCost: 1 });
            const direct = PathFinder.search(r.controller?.pos as RoomPosition, val.pos, { swampCost: 1 });
            // if (bypass.cost + home.cost > (4.0 / 3.0) * direct.cost) { // this justifies a new road
            if (bypass.cost + home.cost > 5 + direct.cost) {
              // TODO: branch new road from bypass
              direct.path.map(pos => r.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD));
            }

            return true;
          });
        this.constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
        // console.log(JSON.stringify(this.constructionSites.map(val => val.structureType)));
        this.designated = true;
      }
      // TODO: build roads to sources
      if (this.bm.activeBuilders <= this.bm.goalBuilderCreepCount) {
        const s: CreepWrapper | null = this.spawnCreepIfNCapped(this.sm.reserves + this.bm.goalBuilderCreepCount);
        if (s) {
          this.bm.registerBuilderCreep(s);
          // TODO: pass hauler
          // CreepActions.staticCreepHarvesting(s);
        }
      }
    }
    if (RCL >= 3) {
      // TODO: construction sites for extensions with dijkstra
      // const extensionsNeeded =
      // const sites = [];
      // while(sites.length<)
      // TODO: build extensions
    }
    // console.log(this.iterations);
    ActionScheduler.get().loop();
  }

}
export default Root;
