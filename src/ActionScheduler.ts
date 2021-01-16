import Action from 'actions/Action';

class ActionScheduler {

    private static instance: ActionScheduler;

    public actions: Action[];

    private constructor() {
        this.actions = [];
    }

    public scheduleAction(action: Action) {
        this.actions.push(action);
    }

    public loop() {
        // TODO: remove finished actions
        this.actions.map(val => { if (!val.isComplete) val.execute(); return val; });
    }

    public static get() {
        if (!ActionScheduler.instance) ActionScheduler.instance = new ActionScheduler();
        return ActionScheduler.instance;
    }

}
export default ActionScheduler;
