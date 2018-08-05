<template>
  <div class="pin-board" v-show="!filtered()">
    
    <div class="grab mute name ctr row">
      <div class="col">
        <h6 class="grab m-0 on-h">
          {{ self.name }}
          <span class="opt is-h hr" @click="amend('board')">
            <icon name="pencil-alt" scale="0.7"></icon>
          </span>
        </h6>
      </div>
      <div class="bare col none on-h opt" @click="openBoard">
        <small class="is-h hl">Open {{ self.links.length }}</small>
        <icon name="external-link-alt" scale="0.8"></icon>
      </div>
    </div>

    <div class="card">
      <div class="mute txt-c" v-if="!self.links.length && !edit.active">
        This board is empty.
      </div>

      <draggable v-model="self.links" :options="drOpt" @start="dr(1)" @end="dr(0)">

        <thumb-tack 
          v-for="(tack, key) in self.links" 
          :key="tack.id" :self="tack"
          v-show="visible(key)" v-on:editTack="amend(key)">
        </thumb-tack>

      </draggable>

      <pin-board-editor 
        v-if="edit.active" 
        :board="id" :item="edit.item"
        v-on:finished="finished">
      </pin-board-editor>

      <div class="show mute txt-c" v-if="overflow">
        <span class="opt" v-show="show" @click="show = false">Show Less</span>
        <span class="opt" v-show="!show" @click="show = true">Show More</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import ThumbTack from './ThumbTack.vue'
  import PinBoardEditor from './PinBoardEditor.vue'

  export default {
    props: ['self', 'id'],
    data() { return { 
      show: false,
      edit: { item: false, active: false },
      dragging: 0, drOpt: { handle: '.grab', group: 'tacks' }
    } },
    computed: {
      filter()   { return this.$store.state.filter },
      rows()     { return this.$store.state.view.rows },
      overflow() { let over = this.self.links.length > this.rows 
        return over && !this.filter.active && !this.edit.active && !this.dragging 
      }
    },
    methods: {
      dr(val)      { this.dragging = val },
      finished()   { return this.edit.active = false },
      filtered()   { return this.$$.filtered(this.filter, this.self, true) },
      amend(thing)  { this.edit.item = thing, this.edit.active = !this.edit.active },
      visible(key) { if (this.edit.active) return false
        return this.show || key < this.rows || this.filter.active || this.dragging
      },
      openBoard()  { 
        return this.$$.openAll(this.self.links, this.$toast, this.$dialog) 
      },
    },
    components: { ThumbTack, PinBoardEditor, Draggable }
  }
</script>

<style lang="less">
  .pin-board {
    h6 { font-weight: 400; }
    .name .col {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: -0.5rem;
    }
  }
</style>