const actions = {

  set_filter({commit}, data) {
    let filter = { active: false, by: 'string', key: '' }
    if (data.string) {
      let by = data.string.charAt(0)
      filter.by = by == ':' ? 'board' : by == '#' ? 'tag' : 'string'
      filter.key = filter.by == 'string' ? data.string : data.string.substr(1)
      filter.active = true
    }
    commit('update_filter', filter)
  },

  open_filtered() {

  },

  import_bookmarks({commit}, data) {
    let file = data.target.files[0]
    if (file) {
      let r = new FileReader()
      r.onload = function(e) {
        // I hope I figure out a better way to do this.
        let dummy = document.createElement('html')
        dummy.innerHTML = e.target.result
        let bookmarks = dummy.getElementsByTagName('a')

        let boards = {}
        Array.prototype.forEach.call(bookmarks, (el) => {
          let result = { tags: [] }

          let c = el.closest('DL').previousElementSibling
          let cat = c.innerText

          while (c.closest('DL')) {
            c = c.closest('DL').previousElementSibling
            if (c.innerText != "Bookmarks" && c.innerText != "Bookmarks Bar") {
              result.tags.push(cat)
              cat = c.innerText
            }
          }

          if (!boards[cat]) boards[cat] = { name: cat, links: [] }

          result.name = el.innerText ? el.innerText : el.href
          result.link = el.href

          boards[cat].links.push(result)
        })

        commit('import_links', boards)
      }
      r.readAsText(file)
    }
  }

}

export default actions