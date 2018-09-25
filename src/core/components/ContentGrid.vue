<template>
  <draggable v-model="stack">
    
    <card-board :class="grid"
      v-if="stack && stack.length"
      v-for="(card, i) in stack"
      :id="i" :key="stack.id"
      :self="card" 
      :trash="source == 'trash'">
      {{ card.name }}
    </card-board>

    <card-board :class="grid"
      v-if="source == 'trash'"
      :self="trashed"
      :trash="trashed"
      :id="'links'">
    </card-board>

    <div class="col none w-50"
      v-if="stack && !stack.length && source != 'trash'">
      <div class="card txt-c">
        You don't have any {{ source }} yet.
      </div>
    </div>

  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import CardBoard from './CardBoard.vue'

  export default {
    props: ['source', 'grid'],
    computed: {
      boards()   { return this.$store.state.boards },
      sessions() { return this.$store.state.sessions },
      trashed()  { return this.$store.state.trash },
      trash()    { return this.trashed.boards },

      stack: {
        get()     { return this[this.source] },
        set(data) { return this.$store.commit('update_' + this.source, data) }
      }
    },
    methods: {},
    components: { Draggable, CardBoard }
  }
</script>

<style scoped>
</style>