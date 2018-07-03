<template>
  <div class="main-menu level">
    <div class="level-left">
      <b-field class="level-item">
        <div class="control">
          <button :class="btnL" @click="$store.commit('toggle_create_new', 'board')">
            <icon name="plus-circle" scale="0.65"></icon>Board
          </button>
        </div>

        <div class="control">
          <button :class="btnL" @click="$store.commit('toggle_create_new', 'link')">
            <icon name="plus-circle" scale="0.65"></icon>Link
          </button>
        </div>
      </b-field>
    </div>
    <div class="level-right">
      <b-field class="level-item">
        <div class="control">
          <button :class="btnR" @click="$store.commit('toggle_view_rows')">
            <icon name="th-list" scale="0.65"></icon> {{ view.rows }}
          </button>
        </div>

        <div class="control">
          <button :class="btnR" @click="$store.commit('toggle_view_cols')">
            <icon name="th" scale="0.65"></icon> {{ view.cols }}
          </button>
        </div>

        <div class="control">
          <button :class="btnT" @click="$store.commit('toggle_view_page', 'trash')">
            <icon name="trash-alt" scale="0.65"></icon> {{ trashed }}
          </button>
        </div>
      </b-field>
    </div>
  </div>
    
    
</template>

<script>
  export default {
    data() { return {
      btnR: 'button is-light is-small is-rounded muted',
      btnL: 'button is-primary is-small is-rounded is-outlined',
      btnA: 'button is-primary is-small is-rounded'
    } },
    computed: {
      btnT()    { return this.view.page == 'trash' ? this.btnA : this.btnR },
      view()    { return this.$store.state.view },
      trash()   { return this.$store.state.trash },
      trashed() { return this.trash.boards.length + this.trash.links.length }
    }
  }
</script>

<style>
  .main-menu .button {
    font-weight: 700;
  }
  .main-menu .fa-icon {
    margin-right: .25rem;
  }
</style>