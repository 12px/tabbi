import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const state = {
  // local
  ver: 1,
  idKey: 2,
  lastUsed: 1,

  // bookmarks
  boards: [{
    id: 1,
    name: "Inbox",
    idKey: 3,
    links: [{
      id: 1, name: "pinnd - testing",
      link: "http://localhost:4000", tags: ["dev", "home"]
    },{
      id: 2, name: "pinnd - testing 2",
      link: "http://localhost:4000", tags: []
    }]
  }],

  trash: {
    name: "Trash",
    links: [],
    boards: []
  },

  // visul config
  view: {
    cols: 3,
    rows: 5,
    trash: false
  }
}

export default new Vuex.Store({ state, mutations })