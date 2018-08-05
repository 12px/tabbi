<template>
  <div class="container">
    <div class="tab row sm">
      <div class="left col">
        <a href="#" @click="$store.commit('toggle_create_new')">
          <icon :name="icon"></icon>
        </a>

        <a :class="active('pinnd')" href="#" @click="show('pinnd')">
          Pinnd
        </a>
        <a :class="active('sessions')" href="#" @click="show('sessions')">
          Sessions
        </a>
      </div>
      <div class="right col none txt-r">
        <a :class="active('trash')" href="#" @click="show('trash')">
          <icon name="trash" scale="0.8"></icon> {{ trashed }}
        </a>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      view()    { return this.$store.state.view },
      trash()   { return this.$store.state.trash },
      create()  { return this.$store.state.create },
      icon()    { return this.create.active ? 'times-circle' : 'plus-circle' },
      trashed() { return this.trash.boards.length + this.trash.links.length }
    },
    methods: {
      show(e)   { return this.$store.commit('switch_tab', e) },
      active(e) { return this.view.tab == e ? 'active' : 'mute' }
    }
  }
</script>

<style scoped>
  .container {
    margin-top: -.5em;
  }
  a {
    border: none;
  }
  .left a {
    margin-right: 1em;
  }
  .active {
    padding-bottom: .2em;
    border-bottom: 1px solid;
  }
  .fa-icon {
    margin-top: -0.2em;
  }
</style>