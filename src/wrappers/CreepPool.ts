import CreepWrapper from './CreepWrapper';

class CreepPool {

  // TODO: make this a wrapper for spawning as well

  private creeps: CreepWrapper[];

  public constructor() {
    // TODO:
    this.creeps = [];
  }

  public containsCreep(creep: Id<Creep>) {
      return !!this.creeps.filter(val => val.id === creep).length;
  }

  public getCreep(creep: Id<Creep>) {
    const res = this.creeps.filter(val => val.id === creep);
    if (!res.length) return null;
    return res[0];
  }

  public addCreep(creep: Id<Creep>) {
    this.creeps.push(new CreepWrapper(creep));
  }

  public makeCreepReserved(creepId: Id<Creep>) {
    const creep = this.creeps.filter(val => val.id === creepId)[0];
    if (creep) creep.reserved = true;
    else console.log(`creep with id: ${creepId} doesn't exist`);
  }

  public makeCreepUnreserved(creep: Id<Creep>) {
    this.creeps.filter(val => val.id === creep)[0].reserved = false;
  }

  // eslint-disable-next-line class-methods-use-this
  public loop() {
    // TODO: check for this.creeps duplicates
    // eslint-disable-next-line no-useless-return
    return;
  }

}
export default CreepPool;