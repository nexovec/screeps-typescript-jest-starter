import BasicRolesExecutor from 'components/BasicRolesExecutor';
import BasicRolesAssigner from 'components/BasicRolesAssigner';
import BasicSpawner from 'components/BasicSpawner';
import RoleDeassigner from 'components/RoleDeassigner';

class Root {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private components: any[];

  // FIXME:
  // eslint-disable-next-line class-methods-use-this
  public loop() {
    // console.log(`tick ${Game.cpu.bucket}`);
    this.components.forEach(component => {
      component.loop();
    });
  }

  private static instance: Root;

  private constructor() {
    this.components = [];
    this.components.push(new RoleDeassigner());
    this.components.push(new BasicSpawner());
    this.components.push(new BasicRolesAssigner());
    this.components.push(new BasicRolesExecutor());
  }

  public static get(): Root {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

}
export default Root;
