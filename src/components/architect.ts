import Components from 'Components';

const architect = {
  loop(): Components[] {
    if (Memory.components[Components.ARCHITECT] === undefined)Memory.components[Components.ARCHITECT] = {};
    const { room } = Game.spawns.Spawn1;
    const RCL = room.controller?.level as number;
    if (RCL >= 2) {
      // build road around the spawn
      const roomTerrain = room.getTerrain();
      const spawnPos = Game.spawns.Spawn1.pos;
      let done = 0;
      for (let i = 0; i < 9; i++) {
        const x = spawnPos.x - 1 + (i % 3);
        const y = spawnPos.y - 1 + Math.floor(i / 3);
        // eslint-disable-next-line no-empty
        if (i === 4) {} else if (roomTerrain.get(x, y) !== TERRAIN_MASK_WALL) {
          if (room.find(FIND_MY_STRUCTURES).filter(stc => stc.pos.x === x && stc.pos.y === y))done += 1;
          else room.createConstructionSite(x, y, STRUCTURE_ROAD);
        } else done += 1;
      }
      const isDone = done === 8;
      // build road from spawn to sources
      if (isDone) {
        room.find(FIND_SOURCES).forEach(src => {
          const spawn = room.find(FIND_MY_SPAWNS)[0];
          const { controller } = room;
          const path = PathFinder.search(spawn.pos, { pos: src.pos, range: 1 });
          path.path.forEach(pos => {
            if (pos === spawn.pos) return;
            room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
          });
        });
        // TODO: check if done
      }
    }
    return [];
  }
};
export default architect;
