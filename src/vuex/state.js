const state = {

  meta: {
    ver:          1,
    linkIndex:    1,
    boardIndex:   2,
    sessionIndex: 1,
    lastBoard:    0,
    updatedAt:    0,
    createdAt:    Date.now(),
    syncData:     false
  },

  view: {
    grid:    3,
    links:   5,
    config:  true,
    sidebar: true,
    tab:     "boards"
  },

  boards:   [ { id: 1, name: "Inbox", links: [] } ],

  sessions: [],
  
  trash:    { 
    name: "Trash",
    links: [],
    boards: []
  },

  // local
  _: {
    mobile: false,
    filter: {
      key:   "",
      type:  "string",
      active: false
    }
  }
}

export default state