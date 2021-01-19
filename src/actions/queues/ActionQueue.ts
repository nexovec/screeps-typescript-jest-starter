import Action from '../Action';

abstract class ActionQueue extends Action {

  protected actions: Action[];

  private index: number;

  public constructor() {
    super();
    this.actions = [];
    this.index = 0;
    this.blocked = true;
  }

  public execute() {
    // NOTE: potential problem with not respawning hauling queues
    if (this.actions[this.index].isComplete) this.index++;
    if (this.index === this.actions.length) {
      this.isComplete = true;
    } else this.actions[this.index].execute();
    return this.isComplete;
  }

}
export default ActionQueue;
