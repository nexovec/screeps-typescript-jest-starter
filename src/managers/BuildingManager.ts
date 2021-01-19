import CreepWrapper from 'wrappers/CreepWrapper';
import SourceManager from './SourceManager';

class BuildingManager {

  public builderCreepCount: number;

  public goalBuilderCreepCount = 2;

  public activeBuilders = 0;

  public builders: CreepWrapper[];

  public haulers: CreepWrapper[];

  public constructor(sm: SourceManager) {
    this.builderCreepCount = Object.keys(Game.creeps).length - sm.reserves;
    this.builders = [];
    this.haulers = [];
  }

  public registerBuilderCreep(creep: CreepWrapper) {
    this.builders.push(creep);
  }

  public registerHaulerCreep(creep: CreepWrapper) {
    this.haulers.push(creep);
  }

}
export default BuildingManager;
