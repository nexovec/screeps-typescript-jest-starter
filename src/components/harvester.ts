/* eslint-disable max-len */
import 'prototypes/prototypeSource';

const cacheForSources: {[creepId: string]: Id<Source>} = {};
function harvest(creep: Creep) {
  if (!cacheForSources[creep.id]) {
    const sources = creep.room.find(FIND_SOURCES);
    cacheForSources[creep.id] = getMostSuitableSourceId(sources);
    (Game.getObjectById(cacheForSources[creep.id])as Source).occupiedWorkSpace++;
  }
  if (creep.store.getFreeCapacity() > 0) {
    if (creep.harvest(Game.getObjectById(cacheForSources[creep.id])as Source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.getObjectById(cacheForSources[creep.id])as Source,
        { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  } else {
    const targets = creep.room.find(FIND_STRUCTURES, { filter: s => isToBeFilled(s) });
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  }
}
function getMostSuitableSourceId(sources: Source[]) {
  let i = 0;
  const back = sources
    .filter(src => src.availableWorkSpace > src.occupiedWorkSpace) // filter on free positions at source
    .map((src, index, arr) => { // catch the most accessible source into i
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      if (src.availableWorkSpace - src.occupiedWorkSpace > arr[i].availableWorkSpace - arr[i].occupiedWorkSpace)i = index;
      return src;
    })
    .filter((_src, index) => (i === index)); // get the i as Source
  console.log(`${back}`);
  if (back[0]) {
    console.log(`harvesting from ${back[0]}`);
    return back[0].id;
  }
  console.log(`defaulting to ${sources[0]}`);
  return sources[0].id;
}
function isToBeFilled(structure: Structure): boolean {
  if (structure.structureType === STRUCTURE_EXTENSION
      || structure.structureType === STRUCTURE_SPAWN
      || structure.structureType === STRUCTURE_TOWER
  ) {
    const s = structure as StructureExtension | StructureSpawn | StructureTower;
    return s.energy < s.energyCapacity;
  }
  return false;
}
const harvester = {
  loop() {
    Object.values(Game.creeps).forEach((creep: Creep) => {
      if (creep.memory.role === 'harvester')harvest(creep);
    });
  }
};
export default harvester;
