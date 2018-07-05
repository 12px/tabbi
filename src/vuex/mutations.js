const mutations = {

  toggle_view_cols(state, data) {
    state.view.cols += state.view.cols < 4 ? 1 : -3
  },

  toggle_view_rows(state, data) {
    state.view.rows = state.view.rows == 5 ? 10: state.view.rows == 10 ? 25 : 5
  },

  toggle_view_page(state, data) { 
    state.view.page = state.view.page == data ? 'pinnd' : data 
  },

  toggle_create_new(state, data) {
    state.create.now = state.create.thing == data ? !state.create.now : true
    state.create.thing = data
  },

  show_create_new(state, data) {
    state.create.now = true, state.create.thing = data
  },

  close_create_new(state, data) { state.create.now = false },

  set_last_used(state, data) { state.lastUsed = data },

  set_filter(state, data) {
    if (!data) return state.filter.active = false
    let by = data.charAt(0)
    state.filter.by = by == '/' ? 'board' : by == '#' ? 'tag' : 'string'
    state.filter.key = state.filter.by == 'string' ? data : data.substr(1)
    state.filter.active = true
  },

  new_board(state, data) {
    state.boards.push({ id: state.boardKey, name: data, links: [] })
    state.boardKey += 1
  },

  new_link(state, data) {
    state.boards[data.board].links.push({ 
      id: state.linkKey, name: data.name,  link: data.link, tags: data.tags
    })
    state.linkKey += 1
  },

  sort_boards(state, data) { state.boards = data },

  change_board(state, data) {
    state.boards[data.new].links.push(link)
    state.boards[data.old].links.splice(data.item, 1)
  },

  trash_board(state, data) {
    let board = state.boards[data]
    // if not empty, trash, otherwise delete
    if (board.links.length) state.trash.boards.push(board)
    state.boards.splice(data, 1)
  },

  trash_link(state, data) {
    let board = state.boards[data.board]
    let item = board.links[data.item]
    state.trash.links.push({ ...item, board: board.id })
    state.boards[data.board].links.splice(data.item, 1)
  }

}

export default mutations