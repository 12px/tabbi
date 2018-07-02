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

  show_create_new(state, data) {
    state.create.now = true
    state.create.thing = data
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
    let board = state.boards[data.board]
    board.links.push({ 
      id: state.linkKey, name: data.name,  link: data.link, tags: data.tags
    })
    state.linkKey += 1
  },

  sort_boards(state, data) { state.boards = data },

  change_board(state, data) {
    let oB = state.boards[data.old]
    let nB = state.boards[data.new]
    nB.links.push(link)
    oB.links.splice(data.item, 1)
  }

}

export default mutations