<template>
  <div id="tabbi"
    @keyup.escape="$store.dispatch('esc')">

    <side-bar
      @newBoard="newBoard()">
    </side-bar>

    <div id="content" :class="{ open: $store.state.view.sidebar }">
      <div class="wrap">

        <div id="toast"></div>

        <ext-popup></ext-popup>

        <tool-bar></tool-bar>

        <div class="progress-bar striped animated" v-if="$store.state._.syncing">
          <span class="progress-bar-blue" style="width: 100%;"></span>
        </div>

        <info-pane v-if="$store.state.view.config"></info-pane>

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
  import CardStack from './sections/CardStack.vue'
  import ExtPopup  from './sections/ExtPopup.vue'

  export default {
    methods: {
      newBoard() {
        this.$store.commit('update_view', { tab: 'boards' })
        this.$store.commit('update_local', { mobile: false })
        this.$store.commit('create_board')
        this.$nextTick().then(() => {
          let boards = this.$refs.cardStack.$children[0].$children
          boards[0].amend('board')
        })
      }
    },
    created() {
      if (this.$store.state.meta.syncData) {
        let sync = () => this.$store.dispatch('enable_sync', this.$sync)
        window.addEventListener('focus', () => sync())
        if (!this.$store.state._.syncing) sync()
      }
      if (window.location.href.indexOf('popup=true') > -1) this.$root.popup = true
    },
    components: { SideBar, ToolBar, InfoPane, CardStack, ExtPopup }
  }
</script>

<style lang="scss">
  @import '~mustard-ui/src/scss/vars/colors.scss';

  $brand-color: $color-blue-500;

  @import '~mustard-ui/src/scss/mustard-ui.scss';
  @import './app.scss';
</style>

<style scoped>
  #toast {
    top: -2px;
    position: fixed;
    .alert {
      border: 1px solid $brand-color;
    }
  }
  .progress-bar {
    left: 20px;
    right: 20px;
    height: 5px;
    margin-top: -18px;
    position: absolute;
  }
</style>