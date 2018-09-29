<template>
  <draggable class="row" v-model="stack" :options="{ handle: '.grab' }">

    <card-board :class="columns"
      v-if="stack && stack.length"
      :trash="source == 'trash'"
      v-for="(card, i) in stack"
      :id="i" :key="stack.id"
      :self="card">
    </card-board>

    <card-board :class="columns"
      v-if="source == 'trash'"
      :self="trashed"
      :trash="trashed"
      :id="'links'">
    </card-board>
    
    <div :class="columns" v-if="notEmpty">
      <div class="card align-center">
        You don't have any {{ source }} yet.
      </div>
    </div>

  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import CardBoard from '../blocks/CardBoard.vue'

  export default {
    computed: {
      source()   { return this.$store.state.view.tab },
      boards()   { return this.$store.state.boards },
      sessions() { return this.$store.state.sessions },
      trashed()  { return this.$store.state.trash },
      trash()    { return this.trashed.boards },

      stack: {
        get()     { return this[this.source] },
        set(data) { return this.$store.commit('update_' + this.source, data) }
      },

      columns()  { return ['col', 'col-md-6', 'col-lg-4', 'col-xlg-2-5'] },
      notEmpty() { return this.stack && !this.stack.length && this.source != 'trash' }
    },
    components: { Draggable, CardBoard }
  }
</script>

<style scoped>
  .row {
    padding: 0;
    margin: 0 -10px;
  }
  .card {
    margin: 0 5px 15px;
  }
</style>