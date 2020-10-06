import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false;

var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: () => {
    const todos:any[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach((element: { id: number } , index: number) => {
      element.id = index
    });
    todoStorage.uid = todos.length
    return todosx
  },
  save:(todos: any) => {
    localStorage.setItem(STORAGE_KEY , JSON.stringify(todos))
  },
}

const app = new Vue({
  el :'#app',
  data:{
    //使用するデータ
  },
  methods:{
    //使用するメソッド
  }
})