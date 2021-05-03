import roleBuilder, { Builder } from 'roles/builder';
import roleHarvester from 'roles/harvester';
import roleUpgrader, { Upgrader } from 'roles/upgrader';

class BasicRolesExecutor {

  public constructor() {
    // TODO:
  }

  public loop() {
    Object.values(Game.creeps).forEach(creep => {
      console.log(`${creep.memory.role}`);
      if (creep.memory.role === 'harvester') {
        console.log('dig, dig, I am harvesting');
        roleHarvester.run(creep);
      }
      if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep as Upgrader);
      }
      if (creep.memory.role === 'builder') {
        roleBuilder.run(creep as Builder);
      }
    });
  }

}
export default BasicRolesExecutor;
