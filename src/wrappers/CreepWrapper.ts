class CreepWrapper {

  public id: Id<Creep>;

  public reserved: boolean;

  public constructor(id: Id<Creep>) {
    this.id = id;
    this.reserved = false;
  }

}
export default CreepWrapper;
