import { cpuUsage } from "process";
import ErrorMapper from "utils/ErrorMapper";

function unwrappedLoop() {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter((name) => !(name in Game.creeps))
    .forEach((name) => delete Memory.creeps[name]);

  // make one worker
  // make pixels
  if (Game.cpu.bucket > 9000) Game.cpu.generatePixel();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, unwrappedLoop };
