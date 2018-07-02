<template>
  <b-dropdown class="main-menu" position="is-bottom-left">
    <button class="button is-primary is-inverted" slot="trigger">
      <icon name="bars"></icon>
    </button>

    <b-dropdown-item>
      <button class="button is-small is-primary"
        @click="$store.commit('show_create_new', 'board')">
        Add New Board
      </button>
    </b-dropdown-item>

    <b-dropdown-item>
      <button class="button is-small is-primary"
        @click="$store.commit('show_create_new', 'link')">
        Add New Link
      </button>
    </b-dropdown-item>

    <!-- use 'custom' to prevent closing -->
    <b-dropdown-item custom>
      <button class="button is-light is-small"
        @click="$store.commit('toggle_view_rows')">
        Max Links: {{ view.rows }}
      </button>
    </b-dropdown-item>

    <b-dropdown-item custom>
      <button class="button is-light is-small"
        @click="$store.commit('toggle_view_cols')">
        Columns: {{ view.cols }}
      </button>
    </b-dropdown-item>

    <b-dropdown-item>
      <button class="button is-outlined is-small is-danger"
        @click="$store.commit('toggle_view_page', 'trash')">
        In Trash: {{ trashed }}
      </button>
    </b-dropdown-item>

  </b-dropdown>
</template>

<script>
  export default {
    computed: {
      view()    { return this.$store.state.view },
      trash()   { return this.$store.state.trash },
      trashed() { return this.trash.boards.length + this.trash.links.length }
    }
  }
</script>

<style>
  .main-menu .button {
    width: 100%;
    font-weight: 700;
  }
  .main-menu .dropdown-item {
    padding-right: 1rem;
  }
  .main-menu .dropdown-item:hover {
    background-color: transparent;
  }
</style>