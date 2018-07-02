<template>
  <div class="container">
    
    <draggable class="columns is-multiline" v-if="!view.trash"
      v-model="sorting" :options="$$.drcfg">
      
      <board :class="cols"
        v-for="(board, key) in boards"
        :id="key" :key="board.id" :self="board">
      </board>

    </draggable>


    <div class="columns is-multiline" v-if="view.trash">
      
    </div>

  </div>
</template>

<script>
  import Board from './PinBoard/Board.vue'
  import Draggable from 'vuedraggable'

  export default {
    computed: {
      view()   { return this.$store.state.view },
      trash()  { return this.$store.state.trash },
      boards() { return this.$store.state.boards },
      sorting: {
        get() { return this.boards },
        set(x) { this.$store.commit('sort_boards', x) }
      },
      cols() {
        let result = ['column', 'is-clipped']
        if (this.view.cols == 1) result.push('is-12')
        if (this.view.cols == 2) result.push('is-half')
        if (this.view.cols == 3) result.push('is-one-third')
        if (this.view.cols == 4) result.push('is-one-quarter')
        return result.join(' ')
      }
    },
    components: { Board, Draggable }
  }
</script>

<style lang="scss">
  .select,
  .select select {
    width: 100%;
  }
</style>