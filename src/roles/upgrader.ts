/* eslint-disable no-bitwise */
import FLAGS from 'flags';

export interface Upgrader extends Creep {
  memory: UpgraderMemory;
}

interface UpgraderMemory extends CreepMemory {
  role: 'upgrader';
  upgrading: boolean;
}

const roleUpgrader = {

  run(creep: Upgrader) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    } else {
      creep.memory.flags |= FLAGS.ROLE_RESET;
    }
  }
};

export default roleUpgrader;
