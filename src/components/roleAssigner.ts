const roleAssigner = {
  loop() {
    Object.values(Game.creeps).forEach(creep => {
      if (!creep.memory.role || creep.memory.role === '')creep.memory.role = 'harvester';
    });
  }

};
export default roleAssigner;
