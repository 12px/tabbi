import Vue from 'vue'
import App from '@/App.vue'

import auth from '@/tools/auth'
import router from '@/tools/router'

Vue.use(auth)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
})