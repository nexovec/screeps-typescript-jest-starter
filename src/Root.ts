class Root {

  public loop() {
    throw new Error('Method not implemented.');
  }

  private static instance: Root;

  private constructor() {

  }

  public static get(): Root {
    if (!Root.instance) Root.instance = new Root();
    return Root.instance;
  }

}
export default Root;
