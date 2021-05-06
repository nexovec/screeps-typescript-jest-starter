import creepSpawner from 'components/creepSpawner';
import harvester from 'components/harvester';
import roleAssigner from 'components/RoleAssigner';
import upgrader from 'components/upgrader';

class Root {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private components: any[];

  public loop() {
    this.components.forEach(cp => cp.loop());
  }

  private static instance: Root;

  private constructor() {
    this.components = [];
    this.components.push(roleAssigner);
    this.components.push(creepSpawner);
    this.components.push(harvester);
    this.components.push(upgrader);
  }

  public static get(): Root {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

}
export default Root;
