<template>
  <div>
    <h1>vue-typescriptによるTODOリストの作成</h1>
    <label v-for="[state, text] in Array.from(labels)" :key="state">
      <input type="radio" v-model="current" :value="state" />
      {{ text }}
    </label>
    {{ filteredTodos.length }} 件を表示中
    <table>
      <thead>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in filteredTodos" :key="todo.id">
          <th>{{ todo.id }}</th>
          <th>{{ todo.name }}</th>
          <td class="state">
            <button @click="toggleState(todo)">
              {{ labels.get(todo.state) }}
            </button>
          </td>
          <td class="button">
            <button @click.ctrl="removeTodo(todo)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      ※削除ボタンはコントロールキーを押しながらクリックしてください。
    </p>
    <h2>新しい作業の追加</h2>
    <form class="add-item" @submit.prevent="addTodo">
      コメント <input type="text" ref="name" />
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoStorage from "./todoStorage";
import { State, TodoItem } from "./todoItems";

const todoStorage = new TodoStorage();

@Component
export default class App extends Vue {
  private todos: TodoItem[] = [];

  private labels = new Map<State, string>([
    [State.All, "全て"],
    [State.Working, "作業中"],
    [State.Done, "完了"],
  ]);

  private current: State = State.All;

  private get filteredTodos() {
    return this.todos.filter((t) =>
      this.current === State.All ? true : this.current === t.state
    );
  }

  private created() {
    this.todos = todoStorage.fetchAll();
  }

  private addTodo() {
    const name = this.$refs.name as HTMLInputElement;
    if (!name.value.length) {
      return;
    }
    this.todos.push({
      id: todoStorage.nextId,
      name: name.value,
      state: State.Working,
    });
    name.value = "";
  }

  private removeTodo(todo: TodoItem) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  private toggleState(todo: TodoItem) {
    todo.state = todo.state === State.Working ? State.Done : State.Working;
  }

  @Watch("todos", { deep: true })
  private onTodoChanged(todos: TodoItem[]) {
    todoStorage.save(todos);
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  max-width: 640px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.button,
tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: All 0.4s;
}
tbody tr.Done td,
tbody tr.Done th {
  background: #f8f8f8;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
