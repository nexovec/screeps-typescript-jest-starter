abstract class Action {
    public isComplete: boolean;
    public constructor(isComplete: boolean) {
        this.isComplete = isComplete;
    }
    public abstract execute(): boolean;
}
export default Action;
