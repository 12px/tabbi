const mutations = {

  toggle_view_cols(state, data) {
    state.view.columns += state.view.columns < 4 ? 1 : -3
  },

  toggle_view_rows(state, data) {
    state.view.rows = state.view.rows == 5 ? 10: state.view.rows == 10 ? 25 : 5
  },

  toggle_view_trash(state, data) {
    state.view.trash = !state.view.trash
  }

}

export default mutations