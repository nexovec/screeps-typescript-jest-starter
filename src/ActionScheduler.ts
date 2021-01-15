import Action from "actions/Action";
import { values } from "lodash";

class ActionScheduler {
    private static instance: ActionScheduler;

    public actions: Array<Action>;
    private constructor() {
        this.actions = [];
    }

    public scheduleAction(action: Action) {
        this.actions.push(action);
        return;
    }
    public loop() {
        // TODO: add children support
        this.actions.map((val, i, arr) => { if (!val.isComplete) val.execute() });
    }

    public static get() {
        if (!ActionScheduler.instance)
            ActionScheduler.instance = new ActionScheduler();
        return ActionScheduler.instance;
    }
}
export default ActionScheduler;
