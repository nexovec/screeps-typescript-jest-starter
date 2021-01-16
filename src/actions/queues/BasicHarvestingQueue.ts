import BasicHarvestingAction from 'actions/BasicHarvestingAction';
import ActionQueue from './ActionQueue';

class BasicHarvestingQueue extends ActionQueue {

    public constructor(creep: Id<Creep>, source: Id<Source>) {
        super();
        for (let i = 0; i < 20; i++) this.actions.push(new BasicHarvestingAction(creep, source));
    }

}
export default BasicHarvestingQueue;
