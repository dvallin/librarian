import Vue from 'vue'
import Vuex from 'vuex';
import VueRouter from 'vue-router'

import { storeOptions } from '@/composition/store'
import { routes } from '@/composition/routes'
import App from '@/composition/App'

Vue.config.productionTip = false
Vue.use(Vuex);
const store = new Vuex.Store(storeOptions)

Vue.use(VueRouter)
const router = new VueRouter({routes})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
