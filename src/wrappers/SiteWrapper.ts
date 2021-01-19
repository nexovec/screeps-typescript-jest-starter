class SiteWrapper {

  public siteId: Id<ConstructionSite>;

  public isComplete: boolean;

  public constructor(siteId: Id<ConstructionSite>) {
    this.siteId = siteId;
    this.isComplete = false;
  }

}
export default SiteWrapper;
