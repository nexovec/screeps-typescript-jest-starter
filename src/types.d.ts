// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  flags: number;
}

interface Memory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: {[name: number]: any};
  uuid: number;
}
interface Source{
  occupiedWorkSpace: number;
  availableWorkSpace: number;
}

// `global` extension samples
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Global {
    genocide(): void;
  }
}
