class Task {

  public name: string;

  public tags: string[];

  public data: { [key: string]: string };

  public parents: Task[];

  public children: Task[];

  public isComplete: boolean;

  public commands: { [index: number]: (task: Task) => boolean };

  public command: number;

  public constructor(name?: string, tags?: string[], commands?: { [index: number]: (task: Task) => boolean }) {
    this.name = name || 'unspecified';
    this.tags = [];
    this.data = {};
    this.parents = [];
    this.children = []; // this isn't done
    this.commands = commands || [];
    this.command = 0;
    this.isComplete = false;
  }

  public eval(): boolean {
    if (this.command === Object.keys(this.commands).length) this.isComplete = true;
    if (this.isComplete) return true;
    if (!this.childrenComplete()) return false;
    if (!this.commands[this.command](this)) return false;
    this.command += 1;
    return this.eval();
  }

  private childrenComplete(): boolean {
    const res = this.children.reduce((total: number, task: Task) => {
      if (!task.isComplete) task.eval();
      if (!task.isComplete) return total;
      return total + 1;
    }, 0);
    if (res === this.children.length) return true;
    console.log('undone subtasks: ', this.children.filter(val => !val.isComplete).length);
    return false;
  }

}
export default Task;
