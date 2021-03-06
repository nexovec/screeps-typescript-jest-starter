import Components from 'Components';
import builder from 'components/roles/builder';
import creepSpawner from 'components/creepSpawner';
import harvester from 'components/roles/harvester';
import roleAssigner from 'components/RoleAssigner';
import upgrader from 'components/roles/upgrader';
import architect from 'components/architect';

class Root {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private components: {[id: number]: any};

  public loop() {
    let demands: Components[] = [];
    demands = demands.concat(Object.keys(this.components).map(p => Number(p) as Components)).reverse();
    while (demands.length > 0) {
      const componentCode = demands.pop() as Components;
      this.components[componentCode].loop();
      demands = demands.reverse().concat(this.components[componentCode].loop()).reverse();
    }
  }

  private static instance: Root;

  private constructor() {
    this.components = {};
    this.components[Components.ROLE_ASSIGNER] = roleAssigner;
    this.components[Components.CREEP_SPAWNER] = creepSpawner;
    this.components[Components.HARVESTER] = harvester;
    this.components[Components.UPGRADER] = upgrader;
    this.components[Components.BUILDER] = builder;
    this.components[Components.ARCHITECT] = architect;
  }

  public static get(): Root {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

}
export default Root;
