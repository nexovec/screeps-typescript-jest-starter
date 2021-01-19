abstract class Action {

  public blocked: boolean;

  public isComplete: boolean;

  public constructor() {
    this.blocked = false;
    this.isComplete = false;
    // TODO: unreserve creep, make a ref counter for reservationCount for ActionQueue integration
  }

  public abstract execute(): boolean;

}
export default Action;
