// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockGlobal, mockInstanceOf, mockStructure } from 'screeps-jest';
import { unwrappedLoop } from './main';

jest.mock('roles/builder');
jest.mock('roles/harvester');
jest.mock('roles/upgrader');
jest.mock('tower');

describe('main loop', () => {
  it('does the first tick crash?', () => {
    mockGlobal<Memory>('Memory', { creeps: {} });
    unwrappedLoop();
  });
});
