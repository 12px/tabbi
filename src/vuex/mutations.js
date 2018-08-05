const mutations = {

  load_data(state, data) {
    state.loaded = true
    for (var prop in data) { state[prop] = data[prop] }
  },

  toggle_view_menu(state, data) {
    state.view.menu = data ? data : !state.view.menu
  },

  toggle_view_active(state, data) {
    state.view.active = state.view.active == "day" ? "night" : "day"
  },

  toggle_view_cols(state, data) {
    state.view.cols += state.view.cols < 4 ? 1 : -3
  },

  toggle_view_rows(state, data) {
    state.view.rows = state.view.rows == 5 ? 10: state.view.rows == 10 ? 25 : 5
  },

  switch_tab(state, data) { 
    state.view.tab = data 
  },

  toggle_create_new(state, data) {
    state.create.active = !state.create.active
    state.view.menu = false
  },

  show_create_new(state, data) {
    state.create.active = true, state.create.thing = data
  },
  
  close_create_new(state, data) {  state.create.active = false  },
  
  set_last_used(state, data) {  state.meta.lastUsed = data  },
  
  update_filter(state, data) {  state.filter = data  },

  new_board(state, data) {
    state.boards.push({ id: state.meta.boardKey, name: data, links: [] })
    state.meta.boardKey += 1
  },

  new_link(state, data) {
    state.boards[data.board].links.push({  id: state.meta.tackKey, 
      name: data.name,  link: data.link, tags: data.tags })
    state.meta.tackKey += 1
  },

  sort_boards(state, data) {  state.boards = data  },

  sort_sessions(state, data) {  state.sessions = data  },

  change_board(state, data) {
    state.boards[data.new].links.push(link)
    state.boards[data.old].links.splice(data.item, 1)
  },

  trash_board(state, data) {
    let board = state.boards[data]
    // if not empty, trash, otherwise delete
    if (board.links.length) {
      state.trash.boards.push(board)

      // if any links have been deleted to this board, add them to the board.
      for (var i = state.trash.links.length - 1; i >= 0; i--) {
        if (state.trash.links[i].board == board.id) {
          delete state.trash.links[i].board;
          board.links.push(state.trash.links[i]);
          state.trash.links.splice(i, 1);
        }
      }
    }
    state.boards.splice(data, 1)
  },

  trash_link(state, data) {
    let board = state.boards[data.board]
    let item = board.links[data.item]
    state.trash.links.push({ ...item, board: board.id })
    state.boards[data.board].links.splice(data.item, 1)
  },

  restore_board(state, data) {
    state.boards.push(state.trash.boards[data])
    state.trash.boards.splice(data, 1)
  },

  restore_tack(state, data) {
    delete data.link.board
    state.boards[data.board].links.push(data.link)
    state.trash.links.splice(data.id, 1)
  },

  remove_board(state, data) { 
    state.trash.boards.splice(data, 1) 
  },

  remove_tack(state, data) { 
    state.trash.links.splice(data, 1) 
  },

  remove_all_tacks(state, data) { 
    state.trash.links = [] 
  },

  import_links(state, data) {
    for (var b in data) {
      let board = data[b]
      for (var l = board.links.length - 1; l >= 0; l--) {
        let link = board.links[l]
        link.id = state.meta.tackKey
        state.meta.tackKey += 1
      }
      board.id = state.meta.boardKey
      state.boards.push(board)
      state.meta.boardKey += 1
    }
  }
}

export default mutations