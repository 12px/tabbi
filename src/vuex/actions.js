const actions = {

  set_filter({commit}, data) {
    let filter = { active: false, by: 'string', key: '' }
    if (data.string) {
      let by = data.string.charAt(0)
      filter.by = by == '/' ? 'board' : by == '#' ? 'tag' : 'string'
      filter.key = filter.by == 'string' ? data.string : data.string.substr(1)
      filter.active = true
    }
    commit('update_filter', filter)
  },

}

export default actions