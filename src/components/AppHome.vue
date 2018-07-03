<template>
  <div id="home">

    <nav id="navbar" class="container">
      <div class="columns is-mobile">
        <div class="column none logo is-hidden-mobile">
          <strong class="has-text-primary">•pinnd•</strong>
        </div>
        <div class="column">
          <b-input rounded placeholder="Type to filter/search" 
            @keyup.native="runFilter"></b-input>
        </div>
        <div class="column none">
          <main-menu></main-menu>
        </div>
      </div>
    </nav>

    <div class="container">

      <!-- Create New -->
      <div class="columns is-multiline" v-if="create.now">
        <create-new :class="cols"></create-new>
      </div>

      <!-- Board View -->
      <draggable class="columns is-multiline" v-if="view.page == 'pinnd'"
        v-model="sorting" :options="{ handle: '.grab' }">
        
        <pin-board :class="cols" v-for="(board, key) in boards" 
          :id="key" :key="board.id" :self="board">
        </pin-board>

      </draggable>


      <!-- Trash View -->
      <div class="columns is-multiline" v-if="view.page == 'trash'">
        
        <!-- Trashed Links -->
        <trash-bin :class="cols" :self="trash" :id="'links'"></trash-bin>

        <!-- Trashed Boards -->
        <trash-bin :class="cols" 
          v-for="(bin, key) in trash.boards" :self="bin" :id="key" :key="key">
        </trash-bin>
      </div>

    </div>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import MainMenu from './MainMenu.vue'
  import CreateNew from './CreateNew.vue'
  import PinBoard from './PinBoard.vue'
  import TrashBin from './TrashBin.vue'

  export default {
    computed: {
      view()   { return this.$store.state.view },
      trash()  { return this.$store.state.trash },
      create() { return this.$store.state.create },
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
    methods: {
      runFilter(e) {
        // if (e.key == 'Enter') open Filtered
        if (e.key == 'Escape' || e.key == 'Enter') e.target.value = result.key = ''
        this.$store.commit('set_filter', e.target.value)
      }
    },
    components: { MainMenu, CreateNew, PinBoard, TrashBin, Draggable }
  }
</script>

<style>
  #navbar.container {
    margin-bottom: 1rem;
  }
  #navbar .logo {
    min-width: 85px;
    padding-top: 1.07em;
  }
</style>