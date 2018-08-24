// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const indexModule = {
  state: {
    count: 0,
    value: 'index'
  },
  mutations: {
    increment(state) {
      const obj = state
      obj.count += 1
    },
    decrement(state) {
      const obj = state
      obj.count -= 1
    },
  }
}

export default indexModule
