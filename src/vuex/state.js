const state = {

  sync: false,

  meta: {
    tackKey: 1,
    boardKey: 2,
    lastUsed: 1
  },

  view: {
    cols: 3,
    rows: 5,
    tab: "pinnd",
    menu: false,
    theme: "day"
  },

  filter: {
    by: "string",
    key: "string",
    active: false
  },

  boards: [{
    id: 1,
    name: "Inbox",
    links: []
  }],

  sessions: [],

  trash: {
    name: "Trash",
    links: [],
    boards: []
  },

  // creating
  create: {
    active: false,
    thing: "board"
  }
}

export default state