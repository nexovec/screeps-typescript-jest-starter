import { uniqueId } from "lodash";
import ErrorMapper from "utils/ErrorMapper";

function unwrappedLoop() {
  // console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter((name) => !(name in Game.creeps))
    .forEach((name) => delete Memory.creeps[name]);

  // make one worker
  Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], _.uniqueId("nex#"))

  let source: Source = Game.spawns.Spawn1.room.find(FIND_SOURCES)[0];
  _.map(Game.creeps, creep =>
    !creep.store.getFreeCapacity() ?
      (
        creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ?
          creep.moveTo(Game.spawns.Spawn1) :
          console.log("transfered energy to source?")
      ) :
      creep.harvest(source) == ERR_NOT_IN_RANGE ?
        creep.moveTo(source) :
        console.log("harvesting!")
  );
  // make pixels
  if (Game.cpu.bucket <= 10000 && Game.cpu.generatePixel)
    if (Game.cpu.bucket > 9000) Game.cpu.generatePixel();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
