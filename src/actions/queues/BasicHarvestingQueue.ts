import BasicHarvestingAction from 'actions/BasicHarvestingAction';
import SourceWrapper from '../../wrappers/SourceWrapper';
import ActionQueue from './ActionQueue';

class BasicHarvestingQueue extends ActionQueue {

    public creep: Id<Creep>;

    public source: SourceWrapper;

    public constructor(creep: Id<Creep>, source: SourceWrapper) {
        super();
        this.creep = creep;
        this.source = source;
        for (let i = 0; i < 20; i++) this.actions.push(new BasicHarvestingAction(creep, source));
        // TODO: send extra creep to each source to cover for absence, make him switch with more productive creep
    }

    public execute() {
        if (!Game.getObjectById(this.creep)) {
            this.source.occupiedSlots--;
            this.isComplete = true; // TODO: make CreepWrapper.die() method
        }
        return super.execute();
    }

}
export default BasicHarvestingQueue;
