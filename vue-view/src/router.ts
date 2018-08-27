import Vue from 'vue'
import Router from 'vue-router'
import Room from './views/Room/index.vue'
import Login from './views/Login/index.vue'
import Register from './views/Register/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'room',
      component: Room
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
