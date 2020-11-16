import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { unwrappedLoop } from "./main";

jest.mock("roles/builder");
jest.mock("roles/harvester");
jest.mock("roles/upgrader");
jest.mock("tower");

const builder = mockInstanceOf<Creep>({ memory: { role: "builder" } });
const harvester = mockInstanceOf<Creep>({ memory: { role: "harvester" } });
const upgrader = mockInstanceOf<Creep>({ memory: { role: "upgrader" } });

const myController = mockInstanceOf<StructureController>({ my: true });
const someoneElsesController = mockInstanceOf<StructureController>({ my: false });
const tower1 = mockStructure(STRUCTURE_TOWER);
const tower2 = mockStructure(STRUCTURE_TOWER);
const myRoomWithTowers = mockInstanceOf<Room>({
  controller: myController,
  find: () => [tower1, tower2]
});
const myRoomWithoutTowers = mockInstanceOf<Room>({
  controller: myController,
  find: () => []
});
const someoneElsesRoom = mockInstanceOf<Room>({ controller: someoneElsesController });
const noOnesRoom = mockInstanceOf<Room>({ controller: undefined });

describe("main loop", () => {
  it("should run every creep", () => {
    mockGlobal<Game>("Game", {
      creeps: {
        builder,
        harvester,
        upgrader
      },
      rooms: {},
      time: 1
    });
    mockGlobal<Memory>("Memory", { creeps: {} });
    unwrappedLoop();
  });

  it("should clean up the memory from deceased creeps", () => {
    mockGlobal<Game>("Game", {
      creeps: { stillKicking: harvester },
      rooms: {},
      time: 1
    });
    mockGlobal<Memory>("Memory", {
      creeps: {}
    });
    unwrappedLoop();
    expect(Memory.creeps).toEqual({ stillKicking: harvester.memory });
  });
});
