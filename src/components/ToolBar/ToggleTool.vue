<template>
  <b-field class="toggle-tool">
    <span class="control max-links">
      <b-tooltip label="Max Visible Links">
        <button :class="cBtn" @click="$store.commit('toggle_view_rows')">
          <icon name="th-list" scale="0.65"></icon>
          <span>{{ view.rows }}</span>
        </button>
      </b-tooltip>
    </span>
    <span class="control board-cols is-hidden-mobile">
      <b-tooltip label="Boards Per Row">
        <button :class="cBtn" @click="$store.commit('toggle_view_cols')">
          <icon name="th" scale="0.65"></icon>
          <span>{{ view.cols }}</span>
        </button>
      </b-tooltip>
    </span>
    <span class="control trash">
      <b-tooltip label="Trashed">
        <button :class="tClass" @click="$store.commit('toggle_view_trash')">
          <icon name="trash" scale="0.65"></icon>
          <span>0</span>
        </button>
      </b-tooltip>
    </span>
  </b-field>
</template>

<script>
  export default {
    data() { return {
      cBtn: 'button is-rounded is-small is-light',
      aBtn: 'button is-rounded is-small is-primary has-text-white'
    } },
    computed: {
      view()    { return this.$store.state.view },
      trash()   { return this.$store.state.trash },
      tClass()  { return this.view.trash ? this.aBtn: this.cBtn },
      trashed() { return this.trash.boards.length + this.trash.links.length }
    }
  }
</script>

<style>
  .toggle-tool {
    justify-content: flex-end!important;
  }

  .toggle-tool .fa-icon {
    margin-right: 0.25rem;
  }

  @media screen and (max-width: 768px) {
    .toggle-tool, .create-tool {
      margin-bottom: 1em;
    }
  }
</style>