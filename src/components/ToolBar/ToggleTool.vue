<template>
  <b-field class="toggle-tool">
    <span class="control max-links">
      <button :class="[cBtn, cTip]" @click="$store.commit('toggle_view_rows')"
        data-tooltip="Max Rows">
        <span class="icon"><icon name="th-list" scale="0.65"></icon></span>
        <span>{{ view.rows }}</span>
      </button>
    </span>
    <span class="control board-cols is-hidden-mobile">
      <button :class="[cBtn, cTip]" @click="$store.commit('toggle_view_cols')"
        data-tooltip="Boards Per Row">
        <span class="icon"><icon name="th" scale="0.65"></icon></span>
        <span>{{ view.cols }}</span>
      </button>
    </span>
    <span class="control trash">
      <button :class="[tClass, cTip]" @click="$store.commit('toggle_view_trash')"
        data-tooltip="Trash">
        <span class="icon"><icon name="trash" scale="0.6"></icon></span>
        <span>0</span>
      </button>
    </span>
  </b-field>
</template>

<script>
  export default {
    data() { return {
      cTip: 'tooltip is-tooltip-primary',
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
      margin-bottom: 1em;
    }
  }
</style>