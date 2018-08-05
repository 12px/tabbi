<template>
  <div id="filterBar">
    <div class="ctr row">
      <div class="menu col none">
        <slot></slot>
      </div>
      <div class="filter col">
        <input type="text" id="filter" v-focus
          placeholder="Type to filter / search" @keyup="runFilter">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      runFilter(e) {
        if (e.key == 'Enter') this.openFiltered()
        if (e.key == 'Escape' || e.key == 'Enter') e.target.value = ''
        this.$store.dispatch('set_filter', { string: e.target.value })
      },
      openFiltered() {
        let result = [];
        let byBoard = this.filter.by == 'board'

        // for EVERY board
        for (var b in this.boards) {
          let board = this.boards[b];

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

        return this.$$.openAll(result, this.$toast, this.$dialog);
      }
    }
  }
</script>

<style scoped>
  #filterBar {
    padding: 1em 10vw 0;
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