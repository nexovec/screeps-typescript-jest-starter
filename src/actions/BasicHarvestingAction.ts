import Action from "actions/Action";
class BasicHarvestingAction extends Action {
    private creepId: Id<Creep>;
    private sourceId: Id<Source>;
    public constructor(creepId: Id<Creep>, sourceId: Id<Source>) {
        super(false);
        this.creepId = creepId;
        this.sourceId = sourceId;
        return;
    }
    public execute(): boolean {
        let creep = Game.getObjectById(this.creepId);
        let source = Game.getObjectById(this.sourceId) as Source;
        if (!creep) { this.isComplete = true; return true; } // if creep is dead
        !creep.store.getFreeCapacity() ?
            (
                creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ?
                    creep.moveTo(Game.spawns.Spawn1) :
                    console.log("transfered energy to source?")
            ) :
            creep.harvest(source) == ERR_NOT_IN_RANGE ?
                creep.moveTo(source) :
                console.log("harvesting!")
        // TODO: ensure update of this.isComplete
        return true;
    }
}
export default BasicHarvestingAction;
