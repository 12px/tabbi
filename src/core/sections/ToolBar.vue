<template>
  <div id="toolbar">
    <div class="card">
      <div class="row">
        <!-- Mobile Sidebar Toggle -->
        <div class="side col display-md-down">
          <a href="#" @click="show()">
            <i class="fas fa-bars"></i>
          </a>
        </div>
        <!-- Filter -->
        <div class="col col-xs-10">
          <input v-focus type="text" placeholder="Type to filter" @keyup="filter">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      mobile() { return this.$store.state._.mobile }
    },
    methods: {
      show() { this.$store.commit('update_local', { mobile: !this.mobile }) },
      filter(e) {
        let key = (e.key == 'Enter' || e.key == 'Escape') ? '' : e.target.value
        let result = { 
          key: '', 
          type: 'string', 
          active: false
        }

        if (key) {
          let by = key.charAt(0)
          result.active = true;
          result.type = by == ':' ? 'board' : by == '#' ? 'tag' : 'string'
          result.key = result.type == 'string' ? key : key.substr(1)
        }

        this.$store.commit('update_local', { filter: result })
        if (e.key == 'Enter') this.openFiltered(result)
      },
      openFiltered(filter) {
        let result = []
        let byBoard = filter.by == 'board'

        // for EVERY board
        for (var b in this.$store.state.boards) {
          let board = this.$store.state.boards[b]

          // for EVERY link
          if (board.links) {
            for (var i = board.links.length - 1; i >= 0; i--) {
              let link = board.links[i]
              let self = byBoard ? board : link
              if (!this.$filtered(filter, self, byBoard)) result.push(link.link)
            }
          }
        }

        return this.$$.openAll(result)
      }
    }
  }
</script>

<style scoped>
  #toolbar {
    padding-bottom: 15px;
  }
  .row .side {
    flex-grow: 0;
    flex-basis: 2em;
    font-size: 1.2em;
    text-align: right;
  }
  .card, .row {
    margin: 0;
    padding: 0;
    align-items: center;
  }
  input[type="text"] {
    border: none;
  }
</style>