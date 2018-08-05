<template>
  <div id="pinnd" :class="view.theme">

    <main-menu :class="view.menu ? 'active' : ''"></main-menu>

    <filter-bar>
      <a class="main" href="#" @click="$store.commit('toggle_view_menu')">
        <icon name="bars"></icon>
      </a>
    </filter-bar>

    <tab-list></tab-list>

    <create-new v-if="create.active"></create-new>

    <div class="container">

      <draggable class="row sm" v-if="view.tab == 'pinnd'"
        v-model="sorting" :options="{ handle: '.grab' }">
          
        <pin-board :class="cols"
          v-for="(board, i) in boards" 
          :id="i" :key="board.id" :self="board">
        </pin-board>

      </draggable>


      <div class="row sm" v-if="view.tab == 'trash'">

        <trash-bin :class="cols" :self="trash" :id="'links'"></trash-bin>

        <trash-bin :class="cols" 
          v-for="(bin, key) in trash.boards"
          :self="bin" :id="key" :key="key">
        </trash-bin>

      </div>

    </div>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import FilterBar from './components/FilterBar.vue'
  import MainMenu from './components/MainMenu.vue'
  import TabList from './components/TabList.vue'
  import CreateNew from './components/CreateNew.vue'
  import PinBoard from './components/PinBoard.vue'
  import TrashBin from './components/TrashBin.vue'

  export default {
    computed: {
      view() { return this.$store.state.view },
      cols() {
        let c = this.view.cols
        let cols = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${cols}`
      },

      trash()  { return this.$store.state.trash },
      create() { return this.$store.state.create },
      boards() { return this.$store.state.boards },
      sorting: {
        get() { return this.boards },
        set(x) { this.$store.commit('sort_boards', x) }
      }
    },
    components: { 
      FilterBar, MainMenu, TabList, CreateNew, PinBoard, TrashBin, Draggable 
    }
  }
</script>

<style lang="less">
  @import '../../morr/src/morr.less';

  @border-radius: .5em;

  body {
    min-width: 300px;
    min-height: 600px;
  }

  #pinnd {
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
  }

  aside    { max-width: 200px; }
  .opt     { cursor: pointer; }
  .grab    { cursor: move; }
  .fa-icon { vertical-align: middle; }

  .card {
    width: 100%;
    padding: 1em;
    border-radius: @border-radius;
    border: 1px solid @color-border;
    border-bottom-width: 2px;

    button {
      padding: 0 1.5em;
      font-size: 0.8em;
    }
  }

  .tag {
    font-size: 0.8em;
    padding: 0.25em 1em;
    margin: 0 .5em .5em 0;
    letter-spacing: 0.1em;
    background: @color-border;
    border-radius: @border-radius;

    .fa-icon {
      cursor: pointer;
      margin-left: 0.5em;
    }
  }

  /*#toolbar {
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
  }*/
</style>