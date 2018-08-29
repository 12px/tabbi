<template>
  <aside :class="['accent active', { open: this.view.sidebar }]">

    <a href="#" class="item" @click="togSidebar()">
      <span class="icon"><icon name="bars" scale="1.2"></icon></span>
      <strong class="label logo">pinnd</strong>
    </a>

    <div style="height: 2em"></div>

    <div class="menu">
      <side-link @click.native="$emit('newBoard')"
        badge="plus-square" label="New Board">
      </side-link>

      <div style="height: 2em"></div>

      <side-link 
        :class="{ active: active('boards') }" 
        badge="thumbtack" label="Boards" 
        @click.native="switchTab('boards')">
      </side-link>

      <side-link 
        :class="{ active: active('sessions') }" 
        badge="book-open" label="Sessions" 
        @click.native="switchTab('sessions')">
      </side-link>

      <side-link 
        :class="{ active: active('trash') }" 
        badge="trash-alt" :label="`Trash (${trashed})`" 
        @click.native="switchTab('trash')">
      </side-link>

      <div style="height: 2em"></div>

      <side-link 
        :class="{ active: view.info }"
        badge="info-circle" label="Info" 
        @click.native="togInfo()">
      </side-link>
    </div>

    <div class="foot">
      <side-link 
        :class="{ active: config && !view.info }"
        badge="ellipsis-h" label="Options" 
        @click.native="togConfig()">
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
      config() { return this.$store.state._.config },
      inSync() { return this.$store.state.meta.syncData },
      header() { return this.view.sidebar ? 'txt-r' : 'txt-c' },
      trashed() {
        let trash = this.$store.state.trash
        return trash.links.length + trash.boards.length
      }
    },
    methods: {
      active(tab)     { return this.view.tab == tab && !this.view.info },
      update(x, obj)  { 
        this.$store.commit('update_' + x, obj) 
        if (obj.info == null && this.view.info) this.togInfo()
      },

      togSidebar()   { this.update('view',  { sidebar: !this.view.sidebar }) },
      switchTab(tab) { this.update('view',  { tab: tab }) },
      togInfo()      { this.update('view',  { info: !this.view.info }) },
      togConfig()    { this.update('local', { config: !this.config }) }
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