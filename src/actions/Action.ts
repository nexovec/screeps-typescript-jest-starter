abstract class Action {

    public blocked: boolean;

    public isComplete: boolean;

    public constructor() {
        this.blocked = false;
        this.isComplete = false;
    }

    public abstract execute(): boolean;

}
export default Action;
