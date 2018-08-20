<template>
  <div id="filterBar">
    <div class="ctr row sm">
      <div class="filter col">
        <input type="text" id="filter" v-focus
          placeholder="Type to filter / search" @keyup="runFilter">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['view', 'filter', 'menu'],
    methods: {
      runFilter(e) {
        let keyword = e.target.value
        if (e.key == 'Enter') this.openFiltered()
        if (e.key == 'Escape' || e.key == 'Enter') keyword = ''

        if (keyword) {
          let by = keyword.charAt(0)
          this.filter.by = by == ':' ? 'board' : by == '#' ? 'tag' : 'string'
          this.filter.key = this.filter.by == 'string' ? keyword : keyword.substr(1)
          this.filter.active = true
        } else {
          this.filter.key = ''
          this.filter.active = false
        }
      },
      openFiltered() {
        let result = [];
        let byBoard = this.filter.by == 'board'

        // for EVERY board
        for (var b in this.$store.state.boards) {
          let board = this.$store.state.boards[b];

          if (board.links) {
            // for EVERY link
            for (var i = 0; i < board.links.length; i++) {
              let link = board.links[i];
              let self = byBoard ? board : link;
              if (!this.$$.filtered(this.filter, self, byBoard)) {
                result.push(link.link)
              }
            }
          }
        }

        return this.$$.openAll(result);
      }
    }
  }
</script>

<style scoped>
  #filterBar {
    padding: 1em 0 0;
  }
  #filter {
    border-radius: 1.5em;
    padding: 1em 1em;
  }
  .col {
    margin-left: 0;
  }
  .menu a {
    border: none;
  }
  .fa-icon {
    margin-top: -0.1em;
  }
</style>