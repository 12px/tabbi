const mutations = {

  refresh(state) { return state = state },

  update_local(state, data) { return state._ = { ...state._, ...data } },

  update_meta(state, data) { return state.meta = { ...state.meta, ...data } },

  update_view(state, data) { return state.view = { ...state.view, ...data } },

  update_trash(state, data) { return state.trash = { ...state.trash, ...data } },

  update_boards(state, data) { return state.boards = data },

  update_sessions(state, data) { return state.sessions = data  },

  // creator
  toggle_creator(state, data) { return state._.create.active = true },

  create_board(state, data) {
    state.boards.unshift({ 
      id: state.meta.boardIndex, 
      name: data ? data : '', 
      links: [] 
    })
    state.meta.boardIndex += 1
  },

  create_link(state, data) {
    let b = data.board ? data.board : 0
    state.boards[b].links.push({  
      id: state.meta.linkIndex, 
      name: data.name ? data.name : '',
      link: data.link ? data.link : '', 
      tags: data.tags ? data.tags : []
    })
    state.meta.linkIndex += 1
    if (data.board) state.meta.lastBoard = data.board
  },

  // editor
  change_board(state, data) {
    state.boards[data.new].links.push(link)
    state.boards[data.old].links.splice(data.item, 1)
  },

  // trash
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
    // if not 'empty', trash, otherwise delete
    if (item.name != '' || item.link != '' || item.tags.length) {
      state.trash.links.push({ ...item, board: board.id })
    }
    state.boards[data.board].links.splice(data.item, 1)
  },


  import_bookmarks(state, data) {
    for (var board in data) {
      data[board].id = state.meta.boardIndex
      state.meta.boardIndex += 1
      for (var l in data[board].links) {
        let link = data[board].links[l]
        link.id = state.meta.linkIndex
        state.meta.linkIndex += 1
      }
      state.boards.push(data[board])
    }
  },

  sync(state, sync) { return sync.save(state) }
}

export default mutations