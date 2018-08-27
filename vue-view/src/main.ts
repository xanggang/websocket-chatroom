import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Loading, Field, Cell, CellGroup, Toast, Icon } from 'vant'
import 'vant/lib/vant-css/base.css';
import 'vant/lib/vant-css/button.css';
import 'vant/lib/vant-css/field.css'
import 'vant/lib/vant-css/cell.css'
import 'vant/lib/vant-css/toast.css'
import 'vant/lib/vant-css/icon.css'
Vue.config.productionTip = false

import './style/Animate.css'
import './style/animate.scss'
import './style/index.scss'
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Toast)
Vue.use(Icon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
