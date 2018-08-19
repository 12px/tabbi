// import dependencies
import Vue from 'vue'
import Vuex from 'vuex'

// import app component
import App from './App.vue'

// import utilities
import sync from './tools/sync'
import utility from './tools/utility'

// apply plugins
Vue.use(Vuex)
Vue.use(sync)
Vue.use(utility)

// set up store
import state from './vuex/state'
import actions from './vuex/actions'
import mutations from './vuex/mutations'

// persist store with LocalForage
import LocalForage from 'localforage'
LocalForage.config({ 
  storeName: 'pinDB',
  driver: LocalForage.indexedDB
})
const persist = store => {
  store.subscribe((mutations, state) => {
    state.meta.updatedAt = Date.now()
    LocalForage.setItem('state', state)
    if (state.meta.syncData) sync.sync.save(state)
  })
}

// import icons
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.config.productionTip = false

// initialize the app
async function initializeApp() {
  // get state from storage, if any
  const loaded = await LocalForage.getItem('state')
  let data = loaded ? {...state, ...loaded} : state

  // don't load local
  data._ = state._

  // set up store
  const store = new Vuex.Store({ 
    state: data, mutations, actions, plugins: [persist]
  })

  // define app
  var app = new Vue({
    store,
    el: '#app',
    render: h => h(App)
  })
}

// ready to go
initializeApp()