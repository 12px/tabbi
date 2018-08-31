<template>
  <div id="pinnd" 
    :class="view.theme" 
    @keyup.escape="$store.dispatch('esc')">

    <side-bar 
      :view="view" 
      v-if="!view.info"
      @newBoard="newBoard()">
    </side-bar>

    <splash-panel
      v-if="view.info">
    </splash-panel>

    <div :class="content" v-if="!view.info">

      <filter-bar 
        :view="view"
        :filter="filter">
      </filter-bar>

      <config-panel 
        v-if="config">
      </config-panel>

      <content-panel :name="'board'"
        v-if="view.tab == 'boards' || filter.active"
        ref="boardPanel"
        :boards="boards"
        :columns="columns">
      </content-panel>

      <content-panel :name="'session'"
        v-if="view.tab == 'sessions' || filter.active"
        ref="sessionPanel"
        :boards="sessions"
        :columns="columns">
      </content-panel>

      <content-panel :name="'trash'"
        v-if="view.tab == 'trash'"
        ref="trashPanel"
        :boards="trash.boards"
        :trash="trash"
        :columns="columns">
      </content-panel>

    </div>


    <div id="toast" class="fix tr"></div>

  </div>
</template>

<script>
  import SideBar      from './components/SideBar.vue'
  import FilterBar    from './components/FilterBar.vue'
  import SplashPanel  from './components/SplashPanel.vue'
  import ConfigPanel  from './components/ConfigPanel.vue'
  import ContentPanel from './components/ContentPanel.vue'

  export default {
    computed: {
      view()     { return this.$store.state.view },
      trash()    { return this.$store.state.trash },
      boards()   { return this.$store.state.boards },
      sessions() { return this.$store.state.sessions },
      config()   { return this.$store.state._.config },
      filter()   { return this.$store.state._.filter },
      content()  { return ['contain', this.view.sidebar ? 'open' : 'closed'] },

      columns() {
        let width, cols = this.view.grid
        if (cols == 5) width = 'w-20'
        if (cols == 4) width = 'w-25'
        if (cols == 3) width = 'w-33'
        if (cols == 2) width = 'w-50'
        if (cols == 1) width = 'w-100'
        return `col m-0 ${width}`
      }
    },
    methods: {
      newBoard() {
        this.$store.commit('update_view', { tab: 'boards' })
        this.$store.commit('create_board')
        this.$nextTick().then(() => {
          let boards = this.$refs.boardPanel.$children[0].$children
          boards[boards.length - 1].amend('board')
        })
      }
    },
    created() {
      if (this.$store.state.meta.syncData) {
        this.$store.dispatch('enable_sync', this.$sync)
      }
    },
    components: { 
      SideBar, FilterBar, SplashPanel, ConfigPanel, ContentPanel
    }
  }
</script>

<style lang="less">
  @import './app.less';
</style>