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
        // eslint-disable-next-line no-continue
        if (i === 4) continue;
        const x = spawnPos.x - 1 + (i % 3);
        const y = spawnPos.y - 1 + Math.floor(i / 3);
        if (roomTerrain.get(x, y) !== TERRAIN_MASK_WALL) {
          if (room.lookForAt(LOOK_STRUCTURES, x, y).length)done++;
          else room.createConstructionSite(x, y, STRUCTURE_ROAD);
        } else done++;
      }
      const isDoneRoadAroundSpawn = done === 8;
      // build road from spawn to sources
      let roadLength = 0;
      let built = 0;
      if (isDoneRoadAroundSpawn) {
        const spawn = room.find(FIND_MY_SPAWNS)[0];
        room.find(FIND_SOURCES).forEach(src => {
          const path = PathFinder.search(spawn.pos, { pos: src.pos, range: 1 });
          roadLength += path.path.length;
          path.path.forEach(pos => {
            if (pos === spawn.pos) return;
            const found = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);
            if (found.length)built++;
            else room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
          });
        });
      } else return [];
      const isDoneRoadsToSources = roadLength === built;
      // build road from spawn to controller
      roadLength = 0;
      built = 0;
      if (isDoneRoadsToSources) {
        const controller: StructureController = room.controller as StructureController;
        const path = PathFinder.search(spawnPos, { pos: controller.pos, range: 1 });
        roadLength += path.path.length;
        path.path.forEach(pos => {
          const spawn = room.find(FIND_MY_SPAWNS)[0];
          if (pos === spawn.pos) return;
          const found = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);
          if (found.length) {
            console.log(room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y)[0]);
            built++;
          } else room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        });
      } else return [];
      const isDoneRoadToController = built === roadLength;
      // console.log(`${isDoneRoadToController}`);
    }
    return [];
  }
};
export default architect;
