/* eslint-disable @typescript-eslint/quotes */
import BuildOrder from "./BuildOrder";
import HarvestingManager from './HarvestingManager';

class BigBrother {

  private static instance: BigBrother;

  public bo: BuildOrder;

  public hm: HarvestingManager;

  private constructor() {
    this.bo = new BuildOrder();
    this.hm = new HarvestingManager();
    this.bo.maxDesiredCreeps = this.hm.totalSlots + this.hm.sourceIDs.length + 1;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }

  public loop() {
    // scan room for resources (lack of upgrade is a resource too)
    // compute demands for resource gathering
    // compute other
    // prioritize (for now first fulfill all resource gathering demands, then build)
    // implement resource gathering
    this.bo.loop();
  }

  public static getInstance(): BigBrother {
    if (!BigBrother.instance) BigBrother.instance = new BigBrother();
    return BigBrother.instance;
  }

}
export default BigBrother;
