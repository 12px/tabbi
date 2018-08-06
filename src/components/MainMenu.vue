<template>
  <aside class="txt-c accent" @keyup.escape="close">
    <div class="abs" @click="close">
      <icon name="times" class="close"></icon>
    </div>

    <h6 class="logo">
      •pinnd•
    </h6>

    <button @click="$store.commit('toggle_create_new', 'board')">
      New Board
    </button>

    <button @click="$store.commit('toggle_create_new', 'link')">
      New Link
    </button>

    <div class="spacer"></div>

    <button @click="$store.commit('toggle_view_rows')">
      Links: {{ view.rows }}
    </button>

    <button @click="$store.commit('toggle_view_cols')">
      Boards: {{ view.cols }}
    </button>

    <button @click="$store.commit('toggle_view_active')">
      Theme: <span class="txtt-c">{{ view.theme }}</span>
    </button>

    <div class="spacer"></div>

    <button @click="$store.dispatch('toggle_sync', $sync)">
      Sync: {{ $store.state.sync ? 'On' : 'Off' }}
    </button>

    <input id="import" type="file" @change="loaded">
    <label class="btn" for="import">Import</label>
  </aside>
</template>

<script>
  export default {
    computed: { 
      view()    { return this.$store.state.view }
    },
    methods: {
      close()   { return this.$store.commit('toggle_view_menu') },
      loaded(e) { return this.$store.dispatch('import_bookmarks', e) }
    }
  }
</script>

<style scoped>
  a {
    border: none;
  }
  strong {
    margin-bottom: 1em;
  }
  .logo {
    margin: 0 0 1em 0;
  }
  .abs {
    top: 1em;
    right: 1em;
    cursor: pointer;
  }
  button, .btn {
    padding: 0;
    width: 100%;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
  }
  .spacer {
    height: 1px;
    margin: 1em 0;
    background: #fff;
  }
</style>