import Components from 'Components';
import creepSpawner from 'components/creepSpawner';
import harvester from 'components/harvester';
import roleAssigner from 'components/RoleAssigner';
import roleDeassigner from 'components/roleDeassigner';
import upgrader from 'components/upgrader';

class Root {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private components: {[id: number]: any};

  public loop() {
    // this.components.forEach(cp => cp.loop());
    // FIXME: do something that isn't ugly instead
    Object.keys(this.components).forEach((id: string) => {
      const back = this.components[Number(id)].loop();
    });
  }

  private static instance: Root;

  private constructor() {
    // this.components = [];
    // this.components.push(roleAssigner);
    // this.components.push(creepSpawner);
    // this.components.push(harvester);
    // this.components.push(upgrader);
    this.components = {};
    this.components[Components.ROLE_DEASSIGNER] = roleDeassigner;
    this.components[Components.ROLE_ASSIGNER] = roleAssigner;
    this.components[Components.CREEP_SPAWNER] = creepSpawner;
    this.components[Components.HARVESTER] = harvester;
    this.components[Components.UPGRADER] = upgrader;
  }

  public static get(): Root {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

}
export default Root;
