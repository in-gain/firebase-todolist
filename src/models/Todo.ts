export default class Todo {
    id = -1;
    tag = '';
    todo = '';
    complete = false;

    constructor(
        id: number,
        tag: string,
        todo: string,
        complete: boolean
    ){
        this.id = id;
        this.tag = tag;
        this.todo = todo;
        this.complete = complete;
    }

    isInclude(str: string): boolean {
        return this.todo.indexOf(str) > -1 
        || this.tag.indexOf(str) > -1;
    }

    isComplete(): boolean{
        return this.complete;
    }

    getValue(key: string): string{
        return (this as any)[key];
    }
}