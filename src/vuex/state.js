const state = {
  // local
  linkKey: 1,
  boardKey: 2,
  lastUsed: 1,
  synced: false,

  // bookmarks
  boards: [{
    id: 1,
    name: "Inbox",
    links: []
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

export default state