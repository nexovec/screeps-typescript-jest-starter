/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import Task from 'tasks/Task';
import TaskFactory from './tasks/TaskFactory';

class BuildOrder {

  private currentTask: Task;
  public maxDesiredCreeps: number;

  public constructor() {
    // make 1 worker
    this.currentTask = TaskFactory.getHarvestingTask();
    this.maxDesiredCreeps = 0;
    // make 5 workers
    // upgrade to RCL 2
    // build extensions
    // make better workers
    // build roads
    // upgrade to RCL 3
    // build a tower
    // build extensions
    // build containers at sources
    // make better workers
    // basic defense
    // upgrade to RCL 4
    // build Storage
    // build extensions
    // more defense
  }

  public loop(): void {
    if (Game.spawns.Spawn1.store.energy >= 200
      && Object.keys(Game.creeps).length < this.maxDesiredCreeps
      && this.currentTask.children.filter(val => !val.isComplete).length === 0)
      this.currentTask.children.push(TaskFactory.getSpawningTask());
    // ensure production of workers, very temporary
    console.log("Undone subtasks: ", this.currentTask.children.length);
    this.currentTask.eval();
    // for now
    // ensure tasks are appended based on fixed criteria
  }

}
export default BuildOrder;
