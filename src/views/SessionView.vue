<template>
  <draggable 
    class="session-view"
    :options="{ handle: '.grab' }"
    v-model="sortSessions"
    @start="startDrag"
    @end="endDrag">
      
    <pin-board
      v-packery-item
      :class="column"
      v-for="(session, i) in sessions"
      :id="i"
      :key="session.id"
      :self="session"
      v-on:updateGrid="$emit('updateGrid')">
    </pin-board>

    <div class="col m-0 w-50" v-if="!sessions.length">
      <div class="card txt-c">
        You don't have any sessions yet! <br>
        You'll need the chrome extension to add some!
      </div>
    </div>

  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import PinBoard  from '../components/PinBoard.vue'

  export default {
    data() { return { live: false } },
    computed: {
      view()   { return this.$store.state.view },
      create() { return this.$store.state.create },
      sessions() { return this.$store.state.sessions },
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
      startDrag() { 
        this.$emit('updateGrid')
        this.live = setInterval(() => { this.$emit('updateGrid') }, 50) 
      },
      endDrag() { 
        this.$emit('updateGrid')
        this.live = false
      }
    },
    components: { Draggable, PinBoard }
  }
</script>

<style>
</style>