import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const state = {
  // local
  ver: 1,
  linkKey: 15,
  boardKey: 3,
  lastUsed: 1,

  // bookmarks
  boards: [{
    id: 1,
    name: "Inbox",
    links: [{
      id: 1, name: "pinnd - testing 1",
      link: "http://localhost:4000", tags: ["dev", "home"]
    },{
      id: 2, name: "pinnd - testing 2",
      link: "http://localhost:4000", tags: []
    },{
      id: 3, name: "pinnd - testing 3",
      link: "http://localhost:4000", tags: []
    },{
      id: 4, name: "pinnd - testing 4",
      link: "http://localhost:4000", tags: []
    },{
      id: 5, name: "pinnd - testing 5",
      link: "http://localhost:4000", tags: []
    },{
      id: 6, name: "pinnd - testing 6",
      link: "http://localhost:4000", tags: []
    }]
  },{
    id: 2,
    name: "Inbox 2",
    links: [{
      id: 7, name: "testing 1",
      link: "http://localhost:4000", tags: []
    },{
      id: 8, name: "testing 2",
      link: "http://localhost:4000", tags: []
    },{
      id: 9, name: "testing 3",
      link: "http://localhost:4000", tags: []
    },{
      id: 10, name: "testing 4",
      link: "http://localhost:4000", tags: []
    },{
      id: 11, name: "testing 5",
      link: "http://localhost:4000", tags: []
    },{
      id: 12, name: "testing 6",
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
    page: 'pinnd' // pinnd, trash
  },

  // filtering
  filter: {
    by: false,
    active: false,
    key: 'string'
  },

  // creating
  create: {
    now: false,
    thing: 'board'
  }
}

export default new Vuex.Store({ state, mutations })