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

  remove_board(state, data) { state.trash.boards.splice(data, 1) },

  remove_tack(state, data) { state.trash.links.splice(data, 1) },

  remove_all_tacks(state, data) { state.trash.links = [] },

  import_bookmarks(state, data) {
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
          result.id = state.linkKey
          state.linkKey += 1

          boards[cat].links.push(result)
        })

        for (var b in boards) {
          boards[b].id = state.boardKey
          state.boards.push(boards[b])
          state.boardKey += 1
        }
      }
      r.readAsText(file)
    }
  }

}

export default mutations