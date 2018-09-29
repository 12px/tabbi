<template>
  <div id="newtt"
    @keyup.escape="$store.dispatch('esc')">

    <side-bar
      @newBoard="newBoard()">
    </side-bar>

    <div id="content" :class="{ open: $store.state.view.sidebar }">
      <div class="wrap">

        <div id="toast"></div>

        <ext-popup></ext-popup>

        <tool-bar></tool-bar>

        <info-pane v-if="$store.state.view.splash"></info-pane>

        <opts-pane v-if="$store.state._.config"></opts-pane>

        <card-stack
          ref="cardStack"
          :source="$store.state.view.tab">
        </card-stack>

      </div>
    </div>

  </div>
</template>

<script>
  import SideBar   from './sections/SideBar.vue'
  import ToolBar   from './sections/ToolBar.vue'
  import InfoPane  from './sections/InfoPane.vue'
  import OptsPane  from './sections/OptsPane.vue'
  import CardStack from './sections/CardStack.vue'
  import ExtPopup  from './sections/ExtPopup.vue'

  export default {
    methods: {
      newBoard() {
        this.$store.commit('update_view', { tab: 'boards' })
        this.$store.commit('create_board')
        this.$nextTick().then(() => {
          let boards = this.$refs.cardStack.$children[0].$children
          boards[0].amend('board')
        })
      }
    },
    created() {
      let sync = this.$store.state.meta.syncData
      if (sync) this.$store.dispatch('enable_sync', this.$sync)
    },
    components: { SideBar, ToolBar, InfoPane, OptsPane, CardStack, ExtPopup }
  }
</script>

<style lang="scss">
  @import '~mustard-ui/src/scss/vars/colors.scss';

  $brand-color: $color-blue-500;

  @import '~mustard-ui/src/scss/mustard-ui.scss';
  @import './app.scss';

  #toast {
    top: -2px;
    position: fixed;
    .alert {
      border: 1px solid $brand-color;
    }
  }
</style>