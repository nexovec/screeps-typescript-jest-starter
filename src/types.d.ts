// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  flags: number;
  role: string;
}

interface Memory {
  uuid: number;
}
interface Source{
  availableSlots: number;
  occupiedSlots: number;
}

// `global` extension samples
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Global {
    genocide(): void;
  }
}
