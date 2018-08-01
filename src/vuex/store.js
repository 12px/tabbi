import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// offline storage plugin
import localforage from 'localforage'

localforage.config({
  driver: localforage.indexedDB,
  storeName: 'pinDB'
})

const persist = store => {
  store.subscribe((mutations, state) => {
    localforage.setItem('state', state)
  })
}


// import store
import state from './state'
import actions from './actions'
import mutations from './mutations'

export default new Vuex.Store({ 
  state, mutations, actions, plugins: [persist]
})