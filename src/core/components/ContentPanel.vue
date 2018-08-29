<template>
  <draggable
    :class="`row sm ${name}-view`"
    :options="{ handle: '.grab' }"
    v-model="boards"
    @start="handle(true)"
    @end="handle(false)">

    <slot></slot>

    <card-board
      v-if="trash"
      :class="columns"
      :self="trash"
      :trash="trash"
      :id="'links'"
      @shuffle="$emit('shuffle')">
    </card-board>

    <card-board
      v-if="boards && boards.length"
      :class="columns"
      v-for="(board, i) in boards"
      :id="i" :key="board.id"
      :self="board"
      :trash="trash"
      @shuffle="$emit('shuffle')">
    </card-board>

    <div v-if="boards && !boards.length && !trash" 
      class="col none w-50">
      <div class="card txt-c">
        <span v-if="name == 'board'">
          You haven't made a board yet!
        </span>
        <span v-if="name == 'session'">
          You don't have any sessions. <br>
          Use the chrome extension to save some!
        </span>
      </div>
    </div>
      
  </draggable>
</template>

<script>
  import Draggable from 'vuedraggable'
  import CardBoard from './CardBoard.vue'

  export default {
    data() { 
      return { 
        drag: false, 
        timer: null,
        packery: { 
          scroll: true,
          transitionDuration: 0,
          itemSelector: '.card-board'
        }
      } 
    },
    props: ['name', 'columns', 'boards', 'trash'],
    methods: {
      handle(drag) {
        this.drag = drag
        this.$emit('shuffle')
        if (!drag) clearInterval(this.timer)
        else this.timer = setInterval(() => this.$emit('shuffle'), 50)
      }
    },
    components: { Draggable, CardBoard }
  }
</script>

<style scoped>
</style>