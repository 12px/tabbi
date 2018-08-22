<template>
  <draggable 
    class="board-view"
    v-packery="packery"
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
      v-on:updateGrid="updateGrid">
    </pin-board>

    <div :class="column" v-if="!boards.length">
      <div class="card txt-c">
        You don't have any boards yet! <br>
        <button @click="$store.state._.create.active = true">Create</button>
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
      },
      packery() {
        return {
          scroll: true,
          transitionDuration: 0,
          itemSelector: '.pin-board'
        }
      }
    },
    methods: {
      updateGrid() { this.$emit('updateGrid', this.$el) },

      startDrag() { 
        this.updateGrid()
        this.live = setInterval(() => { this.updateGrid() }, 50) 
      },
      endDrag() { 
        this.updateGrid()
        this.live = false
      }
    },
    components: {
      Draggable, PinBoard
    }
  }
</script>

<style>
</style>