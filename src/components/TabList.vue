<template>
  <div class="container">
    <div class="tab row">
      <div class="left col">
        <a href="#" @click="$store.commit('toggle_create_new', 'board')">
          <icon name="plus-circle"></icon>
        </a>

        <a :class="active('pinnd')" href="#" @click="show('pinnd')">
          Bookmarks
        </a>
        <a :class="active('sessions')" href="#" @click="show('sessions')">
          Sessions
        </a>
      </div>
      <div class="right col txt-r">
        <a :class="active('trash')" href="#" @click="show('trash')">
          Trash ({{ trashed }})
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
</style>