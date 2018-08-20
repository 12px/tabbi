const state = {

  meta: {
    ver:        2,
    linkIndex:  1,
    boardIndex: 2,
    lastBoard:  1,
    updatedAt:  0,
    createdAt:  Date.now(),
    syncData:   false
  },

  view: {
    grid:    3,
    links:   5,
    sidebar: true,
    tab:     "boards",
    theme:   "day"
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
    cfg: {
      active: false
    },
    filter: {
      key:   "",
      type:  "string",
      active: false
    },

    create: {
      active: false,
      thing:  "board"
    }
  }
}

export default state