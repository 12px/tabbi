<template>
  <div id="pinnd">
    
    <nav id="navbar" class="container">
      <div class="columns is-mobile">
        <div class="column none logo is-hidden-mobile">
          <strong class="has-text-primary">•pinnd•</strong>
        </div>
        <div class="column">
          <b-input rounded placeholder="Type to filter/search" 
            @keyup.native="runFilter"></b-input>
        </div>
        <div class="column none is-hidden-tablet">
          <mobile-menu></mobile-menu>
        </div>
      </div>
    </nav>

    <div id="toolbar" class="container is-hidden-mobile">
      <main-menu></main-menu>
    </div>

    <div class="container">

      <!-- Create New -->
      <div class="columns is-multiline" v-if="create.now">
        <create-new :class="cols"></create-new>
      </div>

      <!-- Board View -->
      <draggable class="columns is-multiline" v-if="view.page == 'pinnd'"
        v-model="sorting" :options="{ handle: '.grab' }">
        
        <pin-board :class="cols" 
          v-for="(board, key) in boards" :id="key" :key="board.id" :self="board">
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
  import MainMenu from './components/MainMenu.vue'
  import MobileMenu from './components/MobileMenu.vue'
  import CreateNew from './components/CreateNew.vue'
  import PinBoard from './components/PinBoard.vue'
  import TrashBin from './components/TrashBin.vue'

  export default {
    computed: {
      view()   { return this.$store.state.view },
      trash()  { return this.$store.state.trash },
      filter() { return this.$store.state.filter },
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
    },
    mounted() {
      this.$goog.loadAPIs().then(() => {
        this.$goog.initialize().then(() => {
          this.$goog.findData().then((data) => {
            if (!data.result.files.length) {
              console.info("No Saved File Data, Creating...")
              this.$goog.createData().then(() => { 
                this.$goog.saveData(this.$store.state).then((file) => {
                  console.info("Created Data.")
                }) 
              })
            } else {
              console.info("Loading Data...")
              this.$goog.loadData(data.result.files[0].id).then((file) => {
                let loaded = JSON.parse(file.body)
                this.$store.commit('load_data', loaded)
                console.info("Loaded Data.")
              })
            }
          })
        })
      })
    },
    components: { MainMenu, MobileMenu, CreateNew, PinBoard, TrashBin, Draggable }
  }
</script>

<style lang="scss">
  $input-hover-border-color: hsl(0, 0%, 86%);
  $input-focus-border-color: hsl(0, 0%, 86%);
  $input-focus-box-shadow-size: 0;
  
  @import '~bulma/bulma.sass';
  @import '~buefy/src/scss/buefy';

  body {
    min-width: 300px;
    min-height: 600px;
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
  }

  #toolbar {
    padding-top: 0;
    margin-bottom: .5rem;
  }
  #navbar .logo {
    min-width: 85px;
    padding-top: 1.07em;
  }

  .container { padding: 1rem }
  .column.none { flex: none; }
  .opt { cursor: pointer; }
  .grab { cursor: move; }
  .muted { color: $grey-light !important; }
  .barely { color: $grey-lighter !important; }
  .is-primary-border { border: 1px solid $primary; }

  @media screen and (max-width: 768px) {
    .is-clipped-mobile {
      overflow: hidden !important;
    }
  }
</style>