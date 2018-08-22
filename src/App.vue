<template>
  <div id="pinnd" :class="view.theme">

    <side-bar 
      :view="view" 
      v-on:newBoard="newBoard">
    </side-bar>


    <div :class="['contain', view.sidebar ? 'open' : 'closed']">

      <filter-bar 
        :view="view"
        :filter="filter">
      </filter-bar>

      <board-view 
        ref="boardView" 
        class="vw row sm" 
        v-if="view.tab == 'boards'">
      </board-view>

      <session-view
        ref="sessionView"
        class="vw row sm"
        v-if="view.tab == 'sessions'">
      </session-view>

      <trash-view 
        ref="trashView"
        class="vw row sm"
        v-if="view.tab == 'trash'">
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