/* eslint-disable @typescript-eslint/no-unused-expressions */
import _ from 'lodash';
import Root from 'Root';
import ErrorMapper from 'utils/ErrorMapper';
import { runTower } from './tower';
// eslint-disable-next-line no-restricted-syntax

function unwrappedLoop() {
  Object.values(Game.rooms).forEach(room => {
    if (room.controller?.my) {
      const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

      towers.forEach(tower => {
        runTower(tower);
      });
    }
  });
  // eslint-disable-next-line no-restricted-syntax
  for (const creep of Object.keys(Game.creeps)) {
    !Memory.creeps[creep] ? Memory.creeps[creep] = { role: '', flags: 0 } : 0;
    !Memory.creeps[creep].role ? Memory.creeps[creep].role = '' : 0;
    !Memory.creeps[creep].flags ? Memory.creeps[creep].flags = 0 : 0;
  }
  Root.get().loop();

  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter(name => !(name in Game.creeps))
    .forEach(name => delete Memory.creeps[name]);

  if (Game.cpu.generatePixel && Game.cpu.bucket > 9000) Game.cpu.generatePixel();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);
function genocide() {
  _.map(Game.creeps, c => c.suicide());
  return 'All your creeps have been killed';
}

export { loop, unwrappedLoop };
global.genocide = genocide;
