// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import index from './pages/index/module'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    index: index
  }
})

export default store
