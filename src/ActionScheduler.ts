import Action from 'actions/Action';

class ActionScheduler {

    private static instance: ActionScheduler;

    public actions: Array<Action>;

    private constructor() {
        this.actions = [];
    }

    public scheduleAction(action: Action) {
        this.actions.push(action);
    }

    public loop() {
        // TODO: add children support
        this.actions.map(val => { if (!val.isComplete) val.execute(); return val; });
    }

    public static get() {
        if (!ActionScheduler.instance) ActionScheduler.instance = new ActionScheduler();
        return ActionScheduler.instance;
    }

}
export default ActionScheduler;
