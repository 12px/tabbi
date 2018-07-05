import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'

import auth from './tools/auth'
import utility from './tools/utility'
import store from './vuex/store'

Vue.use(Buefy)

Vue.use(auth)
Vue.use(utility)

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})