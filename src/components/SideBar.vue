<template>
  <aside :class="isOpen">

    <a href="#" class="item" @click="togSidebar()">
      <span class="icon">
        <icon name="bars" scale="1.2"></icon>
      </span>
      <strong class="label logo">pinnd</strong>
    </a>

    <div style="height: 2em"></div>

    <div class="menu">
      <side-link @click.native="$emit('newBoard')"
        badge="plus-square" label="New Board">
      </side-link>

      <div style="height: 2em"></div>

      <side-link :class="active('boards')" 
        badge="thumbtack" label="Boards" 
        @click.native="switchTab('boards')">
      </side-link>

      <side-link :class="active('sessions')" 
        badge="book-open" label="Sessions" 
        @click.native="switchTab('sessions')">
      </side-link>

      <side-link :class="active('trash')" 
        badge="trash-alt" label="Trash" 
        @click.native="switchTab('trash')">
      </side-link>
    </div>

    <div class="foot">
      <div class="settings" v-if="config.active">

        <side-link @click.native="toggleGrid()"
          badge="columns" :label="`Grid: ${view.grid}`">
        </side-link>

        <side-link @click.native="toggleLinks()"
          badge="th-list" :label="`Links: ${view.links}`">
        </side-link>

        <side-link @click.native="toggleSync()"
          :badge="inSync ? 'sync-alt' : 'exclamation-circle'" 
          :label="`Sync: ${inSync ? 'On' : 'Off'}`">
        </side-link>

        <input id="import" type="file" @change="loaded">
        <label class="opt item" for="import" alt="Import Bookmarks">
          <span class="icon">
            <icon name="upload" scale="1.2"></icon>
          </span>
          <strong class="label">Import</strong>
        </label>
      </div>


      <side-link :class="footer"
        badge="ellipsis-h" label="Options" 
        @click.native="togCfg()">
      </side-link>
    </div>

  </aside>
</template>

<script>
  // Link Component
  var SideLink = {
    props: ['badge', 'label'],
    template: `
      <a class="item" href="#" :title="label">
        <span class="icon">
          <icon :name="badge" scale="1.2"></icon>
        </span>
        <strong class="label">{{ label }}</strong>
      </a>
    `
  }

  export default {
    props: ['view', 'menu', 'creator'],
    computed: {
      config() { return this.$store.state._.cfg },
      inSync() { return this.$store.state.meta.syncData },
      isOpen() { return ['accent active', { open: this.view.sidebar }] },
      header() { return this.view.sidebar ? 'txt-r' : 'txt-c' },
      footer() { return this.$store.state._.cfg.active ? 'active' : '' }
    },
    methods: {
      active(tab) { return this.view.tab == tab ? 'active' : '' },

      togSidebar() { 
        this.$store.commit('update_view', { sidebar: !this.view.sidebar }) 
      },

      toggleGrid() { 
        let grid = this.view.grid
        grid += this.view.grid < 4 ? 1 : -3
        this.$store.commit('update_view', { grid: grid })
      },
      toggleLinks() {
        this.$store.commit('update_view', { 
          links: this.view.links == 5 ? 10: this.view.links == 10 ? 25 : 5 
        })
      },

      switchTab(tab) { this.$store.commit('update_view', { tab: tab }) },

      toggleSync() {
        let sync = this.$store.state.meta.syncData
        this.$store.dispatch(sync ? 'disable_sync' : 'enable_sync', this.$sync)
      },

      loaded(e) { this.$store.dispatch('parse_bookmarks', e) },

      togCfg() { this.config.active = !this.config.active }
    },
    components: { 'side-link': SideLink }
  }
</script>

<style scoped>
  aside {
    width: 65px;
    text-align: center;
    padding: 30px 0 0;
  }
  aside.open {
    width: 200px;
    text-align: left;
  }
  .open >>> .label {
    display: inline-block;
    vertical-align: middle;
  }
  aside a,
  aside > *,
  aside label {
    width: 100%;
    border: none;
    display: block;
    padding: .25em 0;
    margin-bottom: .5em;
  }
  label:hover {
    opacity: 0.8;
  }
  .open a,
  .open label {
    padding-left: 18px;
  }
  .open a.active {
    padding-left: 15px;
  }
  >>> .icon {
    width: 2em;
    text-align: center;
    display: inline-block;
  }
  a.active {
    border-left: 3px solid transparent;
    border-right: 3px solid;
  }
  >>> .label {
    display: none;
    padding-left: 0.25em;
  }
  >>> .label.logo {
    font-size: 1.2em;
    vertical-align: top;
  }
  .foot {
    position: absolute;
    bottom: 20px;
  }
</style>