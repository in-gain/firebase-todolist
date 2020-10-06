import Todo from './Todo';

const TO_DOS_KEY_WORD: string = 'Todos';
const ID_KEY_WORD: string = 'id';
export default class Todos {

    static getInstance(): Todos {
        console.log('MenberList.getInstance');
        if (!this.instance) {
            console.log('call constructor');
            this.instance = new Todos();
        }
        return this.instance;
    }

    private static instance: Todos;
    private todos: Todo[] = [];
    private id: number = 1;

    constructor() {
        console.log('Todos class constructor');
        if (ID_KEY_WORD in localStorage) {
            this.id = JSON.parse(localStorage.getItem(ID_KEY_WORD) as string) as number;
        } else {
            localStorage.setItem(ID_KEY_WORD, JSON.stringify(this.id));
        }
        if (TO_DOS_KEY_WORD in localStorage) {
            const objs: Todo[] = JSON.parse(localStorage.getItem(TO_DOS_KEY_WORD) as string) as Todo[];
            objs.forEach((obj: Todo) => {
                const todo: Todo = new Todo(obj.id, obj.tag, obj.todo, obj.complete);
                this.todos.push(todo);
            });
        } else {
            localStorage.setItem(TO_DOS_KEY_WORD, JSON.stringify(this.todos));
        }
    }
    getTodos():Todo[]{
        return this.todos.slice();
    }

    update(todo:Todo):void{
        const index:number = this.todos.findIndex((td:Todo) => td.id === todo.id);
        this.todos[index] = todo;
        localStorage.setItem(TO_DOS_KEY_WORD, JSON.stringify(this.todos));
    }

    addTodo(todo:Todo):void {
        todo.id = this.id;
        this.todos.push(todo);
        localStorage.setItem(TO_DOS_KEY_WORD,JSON.stringify(this.todos));
        this.id++;
        localStorage.setItem(ID_KEY_WORD,JSON.stringify(this.id));
    }

    delete(target:Todo):void{
        this.todos = this.todos.filter((todo:Todo) => todo.id !== target.id);
        localStorage.setItem(TO_DOS_KEY_WORD,JSON.stringify(this.todos));
    }
}