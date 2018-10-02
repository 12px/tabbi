<template>
  <div id="cardStack">

    <draggable class="row"
      v-if="source != 'trash'"
      v-model="stack"
      :options="{ handle: '.grab' }">

      <card-board v-if="stack && stack.length"
        :class="columns"
        :source="source"
        v-for="(card, i) in stack"
        :id="i" :key="stack.id"
        :self="card">
      </card-board>
    </draggable>

    <div class="row" v-if="source == 'trash'">
      <card-board 
        :class="columns"
        :source="source"
        :self="trash"
        :id="'links'">
      </card-board>

      <card-board 
        :class="columns"
        :source="source"
        type="boards"
        v-for="(card, i) in trash.boards"
        :id="i" :key="stack.id"
        :self="card">
      </card-board>

      <card-board 
        :class="columns"
        :source="source"
        :sesh="true"
        v-for="(card, i) in trash.sessions"
        :id="i" :key="stack.id"
        :self="card">
      </card-board>
    </div>

    <div class="row">
      <div :class="columns" v-if="notEmpty">
        <div class="card align-center">
          You don't have any {{ source }} yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import CardBoard from '../blocks/CardBoard.vue'

  export default {
    computed: {
      source()   { return this.$store.state.view.tab },
      trash()    { return this.$store.state.trash },
      boards()   { return this.$store.state.boards },
      sessions() { return this.$store.state.sessions },

      stack: {
        get()     { return this[this.source] },
        set(data) { return this.$store.commit('update_' + this.source, data) }
      },

      columns()  { return 'col col-md-6 col-lg-4 col-xlg-2-5' },
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