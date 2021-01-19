class CreepWrapper {

  public id: Id<Creep>;

  public reserved: boolean;

  public data: {[index: string]: string};

  public constructor(id: Id<Creep>) {
    this.id = id;
    this.reserved = false;
    this.data = {};
  }

}
export default CreepWrapper;
