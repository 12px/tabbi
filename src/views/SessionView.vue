<template>
  <draggable v-model="sortSessions" :options="{ handle: '.grab' }">
      
    <pin-board :class="cols"
      v-for="(session, i) in sessions" 
      :id="i" :key="session.id" :self="session">
    </pin-board>

    <div class="col m-0 w-50" v-if="!sessions.length">
      <div class="card txt-c">
        You don't have any sessions yet! <br>
        Add some with the chrome extension!
      </div>
    </div>

  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import PinBoard  from '../components/PinBoard.vue'

  export default {
    computed: {
      view()      { return this.$store.state.view },
      sessions()    { return this.$store.state.sessions },
      column() {
        let c = this.view.grid
        let width = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${width}`
      },
      sortSessions: {
        get()     { return this.sessions },
        set(data) { this.$store.commit('update_boards', data) }
      }
    },
    methods: {
      showCreator() { this.create.active = true }
    },
    components: {
      PinBoard, Draggable
    }
  }
</script>

<style scoped>
</style>