import Vue from 'vue'
import Vuex from 'vuex'
import Home from './stores/Home'
import {Toast} from "vant";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Home
  },
  state: {
    loading: false,
    toast: {
      message: '',
      status: false,
      type: 'toast'
    }
  },
  mutations: {
    changeLoading(state, bool: boolean) {
      state.loading = bool
    },
    changeToast(state, obj: {message: string, status: boolean, type: 'success' | 'err' | 'toast'}) {
      state.toast = obj
    }
  },
  actions: {
    changeToast({commit}, obj: {message: string, type: 'success' | 'err' | 'toast'}) {
      commit('changeToast', {message: obj.message, status: true, type: obj.type})
      setTimeout(() => {
        commit('changeToast', {message: '', status: false, type: 'toast'})
      }, 2000)
    }
  }
})
