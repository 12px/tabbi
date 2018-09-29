<template>
  <aside id="sidebar" :class="{ open: view.sidebar, mobile: local.mobile }">

    <!-- Mobile -->
    <a href="#" class="logo display-md-down" @click="close()">
      <i class="fas fa-times"></i>
      <strong>Newtt</strong>
    </a>
    
    <!-- Desktop -->
    <a href="#" class="logo display-lg-up" @click="toggle()">
      <i class="fas fa-bars"></i>
      <strong>Newtt</strong>
    </a>

    <div style="height: 2em"></div>

    <a href="#" @click="$emit('newBoard')">
      <i class="fas fa-plus-square"></i>
      <strong>New Board</strong>
    </a>

    <div style="height: 2em"></div>

    <a href="#" @click="switchTab('boards')"
      :class="{ active: active('boards') }">
      <i class="fas fa-thumbtack"></i>
      <strong>Boards</strong>
    </a>

    <a href="#" @click="switchTab('sessions')"
      :class="{ active: active('sessions') }">
      <i class="fas fa-book-open"></i>
      <strong>Sessions</strong>
    </a>

    <a href="#" @click="switchTab('trash')"
      :class="{ active: active('trash') }">
      <i class="fas fa-trash-alt"></i>
      <strong>Trash</strong>
    </a>

    <a href="#" @click="config()"
      :class="{ active: view.config, 'bottom': 1 }">
      <i class="fas fa-ellipsis-h"></i>
      <strong>Options</strong>
    </a>

  </aside>
</template>

<script>
  // Link Component
  let SideLink = {
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
      config()       { this.update('view',  { config: !this.view.config }) },
      close()        { this.update('local', { mobile: !this.local.mobile }) },
      toggle()       { this.update('view',  { sidebar: !this.view.sidebar }) }
    },
    components: { SideLink }
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