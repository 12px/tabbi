// import dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import { version } from '../package.json'

// import app component
import App from './App.vue'

// import utilities
import sync from './tools/sync'
import filtered from './tools/filtered'
import importer from './tools/importer'
import utility from './tools/utility'

// apply plugins
Vue.use(Vuex)
Vue.use(sync)
Vue.use(filtered)
Vue.use(importer)
Vue.use(utility)

// set up store
import state from './vuex/state'
import actions from './vuex/actions'
import mutations from './vuex/mutations'

// persist store with LocalForage
import LocalForage from 'localforage'
LocalForage.config({ 
  storeName: 'pinnd',
  driver: LocalForage.indexedDB
})
const persist = store => {
  store.subscribe((mutations, state) => {
    state.meta.updatedAt = Date.now()
    LocalForage.setItem('state', state)
    if (state.meta.syncData) sync.sync.save(state)
  })
}

Vue.config.productionTip = false

// initialize the app
async function initializeApp() {
  // get state from storage, if any
  const local = await LocalForage.getItem('state')

  // if storage, merge it
  if (local) {
    state.boards = local.boards
    state.sessions = local.sessions
    state.trash = local.trash
    for (var opt in local.meta) state.meta[opt] = local.meta[opt]
    for (var opt in local.view) state.view[opt] = local.view[opt]
  }

  // set up store
  const store = new Vuex.Store({ 
    state, mutations, actions, plugins: [persist]
  })

  // define app
  var app = new Vue({
    store,
    el: '#app',
    data: { version },
    render: h => h(App)
  })
}

// ready to go
initializeApp()