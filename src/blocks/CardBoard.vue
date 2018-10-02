<template>
  <div v-show="!filtered()">
    <div class="card has-hint">
      <h6 :class="{ grab: source != 'trash' }">
        {{ self.name }}

        <a href="#" class="hint tooltip float-right" 
          v-if="source != 'trash'" @click="openCard()">
          <i class="mute fas fa-external-link-alt"></i>
          <span class="tooltip-text">
            Open {{ self.links.length }} Links
          </span>
        </a>
      </h6>

      <div class="nothing align-center" 
        v-if="!hasLinks && !edit.active">
        There's nothing here.
      </div>

      <draggable
        v-model="self.links"
        :options="{ handle: '.grab', group: 'items' }"
        @start="drag = true" @end="drag = false">

        <card-item
          v-for="(link, key) in self.links"
          :id="id" :key="link.id"
          :self="link"
          :source="source"
          v-show="visible(key)"
          @editItem="amend(key)"
          @remItem="remove(key)"
          @resItem="restore(link, key)">
        </card-item>

      </draggable>

      <card-editor
        v-if="edit.active"
        :board="id"
        :source="source"
        :item="edit.item"
        @finished="finished">
      </card-editor>

      <div class="overflow row align-center">
        <div class="col-xs-4">
          <a href="#" class="hint" 
            v-if="source != 'trash'" 
            @click="amend('board')">
            <strong>Edit</strong>
          </a>
          <a href="#" class="hint bad" 
            v-if="source == 'trash'" 
            @click="remove()">
            <strong>Delete</strong>
          </a>
        </div>
        <div class="col-xs-4">
          <a href="#" @click="show = !show">
            <i class="mute fas fa-ellipsis-h"></i>
          </a>
        </div>
        <div class="col-xs-4">
          <a class="hint" href="#" 
            v-if="source == 'boards'" 
            @click="create()">
            <strong>New</strong>
          </a>
          <a href="#" class="hint good" 
            v-if="source == 'trash'" 
            @click="restore()">
            <strong>Restore</strong>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script> 
  import Draggable  from 'vuedraggable'
  import CardItem   from './CardItem.vue'
  import CardEditor from './CardEditor.vue'

  export default {
    props: ['id', 'self', 'source', 'sesh'],
    data() { 
      return { 
        show: false, drag: false,
        edit: { item: false, active: false } 
      } 
    },
    computed: {
      session()  { return this.source == 'sessions' },
      filter()   { return this.$store.state._.filter },
      trash()    { return this.$store.state.trash },
      links()    { return this.$store.state.view.links },
      overflow() { return this.self.links.length > this.links },
      hasLinks() { return this.self.links && this.self.links.length }
    },
    methods: {
      finished() { return this.edit.active = false },
      filtered() { return this.$filter.out(this.filter, this.self, true) },
      amend(itm) { this.edit.item = itm, this.edit.active = !this.edit.active },
      openCard() { return this.$$.openAll(this.self.links) },
      visible(i) { if (this.edit.active) return false
        return this.show || i < this.links || this.filter.active || this.drag
      },
      create() {
        this.$store.commit('create_link', { board: this.id })
        this.amend(this.self.links.length - 1)
      },
      remove(id) {
        if (id || id === 0) this.self.links.splice(id, 1)
        else if (this.id == 'links') this.self.links = []
        else if (this.sesh) this.trash.sessions.splice(this.id, 1)
        else this.trash.boards.splice(this.id, 1)
        this.$store.commit('refresh')
      },
      restore(tack, key) {
        if (tack) {
          let board = this.$$.xById(this.$store.state.boards, tack.board)
          if (board < 0) return this.$$.toast("Unknown Board.")
          delete tack.board
          this.$store.state.boards[board].links.push(tack)
          this.trash.links.splice(key, 1)
        } else {
          if (this.id != 'links') {
            if (this.sesh) {
              this.$store.state.sessions.push(this.trash.sessions[this.id])
              this.trash.sessions.splice(this.id, 1)
            } else {
              this.$store.state.boards.push(this.trash.boards[this.id])
              this.trash.boards.splice(this.id, 1)
            }
          } else {
            for (var i = this.trash.links.length - 1; i >= 0; i--) {
              this.restore(this.trash.links[i], i)
            }
          }
        }
        this.$store.commit('refresh')
      }
    },
    components: { Draggable, CardItem, CardEditor }
  }
</script>

<style scoped>
  h6 a {
    margin-top: -2px;
  }
  .fa-external-link-alt {
    font-size: 0.8rem;
  }
  .card {
    overflow: visible;
    margin: 0 5px 15px;
    padding: 20px 30px 10px;
  }
  .nothing {
    padding: 10px 0 0;
  }
  .overflow {
    padding-top: 10px;
  }
  .overflow i {
    font-size: 1.2em;
  }
  .tooltip {
    border: none;
  }
  .tooltip-text {
    padding: 5px;
    min-width: 175px;
    font-size: 0.7rem;
    font-weight: 700;
    background-color: rgba(0,0,0,0.6);
    text-transform: uppercase;
  }
</style>