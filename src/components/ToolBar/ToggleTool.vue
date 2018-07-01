<template>
  <b-field class="toggle-tool">
    <span class="control max-links">
      <button :class="cBtn" @click="$store.commit('toggle_view_rows')">
        <span>Show {{ view.rows }}</span>
      </button>
    </span>
    <span class="control board-cols">
      <button :class="cBtn" @click="$store.commit('toggle_view_cols')">
        <span class="icon"><icon name="th" scale="0.65"></icon></span>
      </button>
    </span>
    <span class="control trash">
      <button :class="tClass" @click="$store.commit('toggle_view_trash')">
        <span class="icon"><icon name="trash" scale="0.6"></icon></span>
        <span>0</span>
      </button>
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

  @media screen and (max-width: 768px) {
    .toggle-tool, .create-tool {
      justify-content: center!important;
    }
  }
</style>