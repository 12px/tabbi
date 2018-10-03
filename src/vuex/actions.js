const actions = {

  esc({commit, state}) {
    if (state._.mobile) return commit('update_local', { mobile: false })
    if (state.view.config) return commit('update_view', { config: false })
    if (state._.filter.active) {
      return commit('update_local', { filter: { key: '', active: false } })
    }
  },

  enable_sync({commit, state}, sync) {
    state._.syncing = true
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
      state._.syncing = false
    })
  },

  disable_sync({commit, state}, sync) {
    sync.disable().then(() => { commit('update_meta', { syncData: false }) })
  }

}

export default actions