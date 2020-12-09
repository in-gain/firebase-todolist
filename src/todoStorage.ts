import { TodoItem } from "./todoItems";

interface Storable {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
  }
  
  const STORAGE_KEY = 'todos-vuejs-demo'
  
  export default class TodoStorage {
    get nextId(): number {
      return this.fetchAll().length + 1
    }
  
    constructor(
      private storage: Storable = localStorage
    ) { }
  
    public fetchAll(): TodoItem[] {
      const todos = JSON.parse(
        this.storage.getItem(STORAGE_KEY) || '[]'
      ) as TodoItem[];
      todos.forEach((todo, index) => todo.id = index)
      return todos;
    }
  
    public save(todos: TodoItem[]) {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }