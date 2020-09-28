import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

const app = new Vue({
  el :'#app',
  data:{
    //使用するデータ
  },
  methods:{
    //使用するメソッド
  }
})