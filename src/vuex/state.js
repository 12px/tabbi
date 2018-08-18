const state = {

  meta: {
    linkIndex:  1,
    boardIndex: 2,
    lastBoard:  1,
    updatedAt:  0,
    createdAt:  Date.now(),
    syncData:   false
  },

  view: {
    grid:  3,
    links: 5,
    tab:   "pinnd",
    theme: "day"
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
    menu: {
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