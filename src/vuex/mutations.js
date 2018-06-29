const mutations = {

  toggle_view_cols(state, data) {
    state.view.cols += state.view.cols < 4 ? 1 : -3
  },

  toggle_view_rows(state, data) {
    state.view.rows = state.view.rows == 5 ? 10: state.view.rows == 10 ? 25 : 5
  },

  toggle_view_trash(state, data) {
    state.view.trash = !state.view.trash
  },

  set_last_used(state, data) {
    state.lastUsed = data
  },

  new_board(state, data) {
    state.boards.push({ id: state.idKey, name: data, idKey: 1, links: [] })
    state.idKey += 1
  },

  new_link(state, data) {
    let board = state.boards[data.board]
    board.links.push({ 
      id: board.idKey, name: data.name,  link: data.link, tags: data.tags
    })
    board.idKey += 1
  },

}

export default mutations