import Root from 'Root';
import ErrorMapper from 'utils/ErrorMapper';

function unwrappedLoop() {
  // console.log(`Current game tick is ${Game.time}`);
  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter(name => !(name in Game.creeps))
    .forEach(name => delete Memory.creeps[name]);
  Object.keys(Game.creeps).forEach(creepId => {
    if (Memory.creeps[creepId] === undefined) Memory.creeps[creepId] = { role: '', flags: 0 };
    if (Memory.creeps[creepId].role === undefined) Memory.creeps[creepId].role = '';
    if (Memory.creeps[creepId].flags === undefined) Memory.creeps[creepId].flags = 0;
  });
  Root.get().loop();

  if (Game.cpu.generatePixel && Game.cpu.bucket > 9000) Game.cpu.generatePixel();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);
// eslint-disable-next-line func-names
global.genocide = function () {
  // eslint-disable-next-line no-restricted-syntax
  for (const creep of Object.values(Game.creeps)) {
    creep.suicide();
    console.log('All creeps have been killed!');
  }
};
export { loop, unwrappedLoop };
