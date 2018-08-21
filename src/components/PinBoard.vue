<template>
  <div class="pin-board" v-show="!filtered()">

    <div class="card">
      <div class="header on-h">
        <div class="ctr row">
          <div class="mute col">
            <h6 class="grab m-0">
              {{ self.name }}
              <span class="bare opt is-h hr" @click="amend('board')">
                <icon name="pencil-alt" scale="0.8"></icon>
              </span>
            </h6>
          </div>
          <div class="bare col none opt" @click="openBoard">
            <span class="is-h hl">Open {{ self.links.length }}</span>
            <icon name="external-link-alt" scale="0.9"></icon>
          </div>
        </div>
      </div>
      <div class="mute empty txt-c" v-if="!self.links.length && !edit.active">
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

      <div class="footer on-h">
        <div class="ctr row">
          <div class="bare col is-h txt-c">
            <span v-if="self.links.length > links">
              {{ show ? 'Hide' : 'Show'}} {{ self.links.length - links }}
            </span>
          </div>
          <div :class="more" @click="show = !show">
            <icon name="ellipsis-h"></icon>
          </div>
          <div class="main col txt-c is-h">
            <span class="opt">
              New
            </span>
          </div>
        </div>
      </div>

      <div class="show mute txt-c" v-if="overflow">
        
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
      more()     { return { 
        'bare col none txt-c': 1, 'opt': this.self.links.length > this.links } 
      },
      filter()   { return this.$store.state._.filter },
      links()     { return this.$store.state.view.links },
      overflow() { let over = this.self.links.length > this.links 
        return over && !this.filter.active && !this.edit.active && !this.dragging 
      }
    },
    methods: {
      dr(val)      { this.dragging = val },
      finished()   { return this.edit.active = false },
      filtered()   { return this.$$.filtered(this.filter, this.self, true) },
      amend(thing)  { this.edit.item = thing, this.edit.active = !this.edit.active },
      visible(key) { if (this.edit.active) return false
        return this.show || key < this.links || this.filter.active || this.dragging
      },
      openBoard()  { 
        return this.$$.openAll(this.self.links, this.$toast, this.$dialog) 
      },
    },
    components: { ThumbTack, PinBoardEditor, Draggable }
  }
</script>

<style scoped>
  h6 { font-weight: 400; }
  .empty {
    padding: 1em 0;
  }
</style>