import Vue from 'vue'
import App from './App.vue'

import auth from './tools/auth'
import router from './tools/router'

Vue.use(auth)

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App)
})

export default app