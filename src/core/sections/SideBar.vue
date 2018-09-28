<template>
  <aside id="sidebar" :class="{ open: view.sidebar, mobile: local.mobile }">

    <!-- Mobile -->
    <a href="#" class="logo display-md-down" @click="close()">
      <i class="fas fa-times"></i>
      <strong>pinnd</strong>
    </a>
    
    <!-- Desktop -->
    <a href="#" class="logo display-lg-up" @click="toggle()">
      <i class="fas fa-bars"></i>
      <strong>pinnd</strong>
    </a>

    <div style="height: 2em"></div>

    <tool badge="fa-plus-square" label="New Board"
      @click.native="$emit('newBoard')">
    </tool>

    <div style="height: 2em"></div>

    <tool badge="fa-thumbtack" label="Boards"
      :class="{ active: active('boards') }"
      @click.native="switchTab('boards')">
    </tool>

    <tool badge="fa-book-open" label="Sessions"
      :class="{ active: active('sessions') }"
      @click.native="switchTab('sessions')">
    </tool>

    <tool badge="fa-trash-alt" label="Trash"
      :class="{ active: active('trash') }"
      @click.native="switchTab('trash')">
    </tool>

    <tool badge="fa-info-circle" label="Info"
      :class="{ active: local.splash, 'bottom': 1 }"
      @click.native="splash()">
    </tool>

    <tool badge="fa-ellipsis-h" label="Options"
      :class="{ active: local.config }"
      @click.native="config()">
    </tool>

  </aside>
</template>

<script>
  // Link Component
  let Tool = {
    props: ['badge', 'label'],
    template: 
      `<a href="#" :title="label">
        <i :class="['fas', badge]"></i>
        <strong>{{ label }}</strong>
      </a>`
  }

  export default {
    computed: {
      view()   { return this.$store.state.view },
      local() { return this.$store.state._ }
    },
    methods: {
      update(x, obj) { this.$store.commit('update_' + x, obj) },
      active(tab)    { return this.view.tab == tab && !this.view.info },
      switchTab(tab) { this.update('view',  { tab: tab }) },
      splash()       { this.update('view',  { splash: !this.view.splash }) },
      config()       { this.update('local', { config: !this.local.config }) },
      close()        { this.update('local', { mobile: !this.local.mobile }) },
      toggle()       { this.update('view',  { sidebar: !this.view.sidebar }) }
    },
    components: { Tool }
  }
</script>

<style scoped>
  >>> a {
    width: 100%;
    margin-bottom: .75em;
  }

  >>> i {
    width: 2em;
    font-size: 1.2em;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
  }

  >>> strong { 
    display: none; 
    font-weight: 700;
    padding-left: .25em;
    vertical-align: middle;
  }

  >>> .bottom {
    margin-top: auto;
    margin-bottom: 1em;
  }

  .active {
    border-right: 3px solid;
    border-left: 3px solid transparent;
  }

  .logo strong {
    font-size: 1.2em;
    margin-top: -.1em;
    vertical-align: top;
  }

  .open a,
  .mobile a {
    padding-left: 15px;
    border-left: none;
  }

  .open >>> strong,
  .mobile >>> strong {
    display: inline-block;
  }
</style>