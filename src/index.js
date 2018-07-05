import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'

import store from './vuex/store'
import utility from './utility'

Vue.use(Buefy)
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