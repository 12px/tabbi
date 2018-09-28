const actions = {

  esc({commit, state}) {
    if (state._.filter.active) {
      return commit('update_local', { filter: { key: '', active: false } } )
    }
  },

  enable_sync({commit, state}, sync) {
    sync.enable(state).then((data) => { 
      if (data.state) {
        commit('update_meta', data.state.meta)
        commit('update_view', data.state.view)
        commit('update_trash', data.state.trash)
        //TODO: Merge instead of replace boards/sessions
        commit('update_boards', data.state.boards)
        commit('update_sessions', data.state.sessions)
      }
      else commit('update_meta', { syncData: data.sync }) 
    })
  },

  disable_sync({commit, state}, sync) {
    sync.disable().then(() => { commit('update_meta', { syncData: false }) })
  }

}

export default actions