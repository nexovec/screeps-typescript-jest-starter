const helperFunctions = {
  getExtraHarvestersPerSource(source: Source): number {
    return Math.ceil(PathFinder.search(Game.spawns.Spawn1.pos, { pos: source.pos, range: 1 }).cost / 50);
  }
};
export default helperFunctions;
