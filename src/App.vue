<template>
  <div id="pinnd" :class="view.theme" @keyup.escape="$store.dispatch('escape')">

    <main-menu :view="view" :menu="menu" :creator="creator"></main-menu>

    <filter-bar :view="view" :menu="menu" :filter="filter"></filter-bar>

    <tab-list></tab-list>

    <create-new :creator="creator"></create-new>

    <div class="container">

      <draggable class="row sm" v-if="view.tab == 'pinnd'"
        v-model="sortBoards" :options="{ handle: '.grab' }">
          
        <pin-board :class="cols"
          v-for="(board, i) in boards" 
          :id="i" :key="board.id" :self="board">
        </pin-board>

        <div :class="cols" v-if="!boards.length">
          <div class="card txt-c">
            You don't have any boards yet! <br>
            <button @click="creator.active = true">Create</button>
          </div>
        </div>

      </draggable>

      <draggable class="row sm" v-if="view.tab == 'sessions'"
        v-model="sortSessions" :options="{ handle: '.grab' }">
          
        <pin-board :class="cols"
          v-for="(session, i) in sessions" 
          :id="i" :key="session.id" :self="session">
        </pin-board>

        <div class="col m-0 w-50" v-if="!sessions.length">
          <div class="card txt-c">
            You don't have any sessions yet! <br>
            Add some with the chrome extension!
          </div>
        </div>

      </draggable>


      <div class="row sm" v-if="view.tab == 'trash'">

        <trash-bin :class="cols" :self="trash" :id="'links'"></trash-bin>

        <trash-bin :class="cols" 
          v-for="(bin, key) in trash.boards"
          :self="bin" :id="key" :key="key">
        </trash-bin>

      </div>

    </div>

    <div id="toast" class="fix tr"></div>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import FilterBar from './components/FilterBar.vue'
  import MainMenu  from './components/MainMenu.vue'
  import TabList   from './components/TabList.vue'
  import CreateNew from './components/CreateNew.vue'
  import PinBoard  from './components/PinBoard.vue'
  import TrashBin  from './components/TrashBin.vue'

  export default {
    computed: {
      view()     { return this.$store.state.view },
      menu()     { return this.$store.state._.menu },
      trash()    { return this.$store.state.trash },
      boards()   { return this.$store.state.boards },
      sessions() { return this.$store.state.sessions },
      filter()   { return this.$store.state._.filter },
      creator()  { return this.$store.state._.create },

      cols() {
        let c = this.view.grid
        let cols = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${cols}`
      },

      sortBoards: {
        get()     { return this.boards },
        set(data) { this.$store.commit('update_boards', data) }
      },
      sortSessions: {
        get()     { return this.sessions },
        set(data) { this.$store.commit('update_sessions', data) }
      }
    },
    created() {
      if (this.$store.state.meta.syncData) {
        this.$store.dispatch('enable_sync', this.$sync)
      }
    },
    components: { 
      FilterBar, MainMenu, TabList, CreateNew, PinBoard, TrashBin, Draggable 
    }
  }
</script>

<style lang="less">
  @import '../../morr/src/morr.less';
  @import './app.less';
</style>