<template>
  <draggable 
    class="board-view"
    :options="{ handle: '.grab' }"
    v-model="sortBoards"
    @start="startDrag"
    @end="endDrag">
      
    <pin-board
      v-packery-item
      :class="column"
      v-for="(board, i) in boards"
      :id="i"
      :key="board.id"
      :self="board"
      v-on:updateGrid="$emit('updateGrid')">
    </pin-board>

    <div :class="column" v-if="!boards.length">
      <div class="card txt-c">
        You don't have any boards yet! <br>
      </div>
    </div>

  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import PinBoard  from '../components/PinBoard.vue'

  export default {
    data() { return { live: false } },
    computed: {
      view()   { return this.$store.state.view },
      create() { return this.$store.state.create },
      boards() { return this.$store.state.boards },
      column() {
        let c = this.view.grid
        let width = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${width}`
      },
      sortBoards: {
        get()     { return this.boards },
        set(data) { this.$store.commit('update_boards', data) }
      }
    },
    methods: {
      startDrag() { 
        this.$emit('updateGrid')
        this.live = setInterval(() => { this.$emit('updateGrid') }, 50) 
      },
      endDrag() { 
        this.$emit('updateGrid')
        this.live = false
      }
    },
    components: { Draggable, PinBoard }
  }
</script>

<style>
</style>