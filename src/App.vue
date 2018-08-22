<template>
  <div id="pinnd" :class="view.theme">

    <side-bar 
      :view="view" 
      v-on:newBoard="newBoard">
    </side-bar>


    <div :class="['contain', view.sidebar ? 'open' : 'closed']">

      <filter-bar 
        :view="view"
        :filter="filter"
        v-on:updateGrid="updateGrid('boardView')">
      </filter-bar>

      <board-view v-if="view.tab == 'boards'"
        ref="boardView" 
        class="row sm" 
        v-on:updateGrid="updateGrid('boardView')">
      </board-view>

      <session-view v-if="view.tab == 'sessions'"
        ref="sessionView"
        class="row sm">
      </session-view>

      <trash-view v-if="view.tab == 'trash'"
        ref="trashView"
        class="row sm">
      </trash-view>

    </div>


    <div id="toast" class="fix tr"></div>

  </div>
</template>

<script>
  import BoardView   from './views/BoardView.vue'
  import SessionView from './views/SessionView.vue'
  import TrashView   from './views/TrashView.vue'

  import SideBar   from './components/SideBar.vue'
  import FilterBar from './components/FilterBar.vue'

  import { packeryEvents } from 'vue-packery-plugin'

  export default {
    computed: {
      view()     { return this.$store.state.view },
      trash()    { return this.$store.state.trash },
      sessions() { return this.$store.state.sessions },
      filter()   { return this.$store.state._.filter },

      cols() {
        let c = this.view.grid
        let cols = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${cols}`
      },

      sortSessions: {
        get()     { return this.sessions },
        set(data) { this.$store.commit('update_sessions', data) }
      }
    },
    methods: {
      newBoard() {
        this.$store.commit('update_view', { tab: 'boards' })
        this.$store.commit('create_board')
        let boards = this.$refs.boardView.$children[0].$children
        setTimeout(() => boards[boards.length - 1].amend('board'), 100)   
      },
      updateGrid(el) { packeryEvents.$emit('layout', this.$refs[el].$el) }
    },
    created() {
      if (this.$store.state.meta.syncData) {
        this.$store.dispatch('enable_sync', this.$sync)
      }
    },
    components: { 
      BoardView, SessionView, TrashView, SideBar, FilterBar 
    }
  }
</script>

<style lang="less">
  @import './app.less';
</style>