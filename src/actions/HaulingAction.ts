import CreepWrapper from 'wrappers/CreepWrapper';
import Action from './Action';

class HaulingAction extends Action {

    private room: Room;

    private creep: CreepWrapper;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    public constructor(creep: CreepWrapper, room: Room) {
        super();
        // NOTE: haulers build and haul for now
        this.room = room;
        this.creep = creep;
    }

    public execute(): boolean {
        const resources = this.room.find(FIND_DROPPED_RESOURCES);
        resources.map(val => {
            const creep = Game.getObjectById(this.creep.id);
            if (creep?.pickup(val) === ERR_NOT_IN_RANGE) creep.moveTo(val);
            return creep;
        });
        return true;
    }

} export default HaulingAction;
