<template>
  <div class="card-board" 
    v-show="!filtered()">

    <div class="card">

      <div class="header on-h ctr row">
        <div class="mute col">
          <h6 :class="headClass">
            {{ self.name }}
            <span v-if="!trash"
              @click="amend('board')"
              class="bare opt is-h hr">
              <icon name="pencil-alt" scale="0.8"></icon>
            </span>
          </h6>
        </div>
        <div :class="optsClass" @click="handleOpt()">
          <span class="is-h hl" v-if="hasLinks">
            {{ trash ? 'Restore' : 'Open' }} {{ self.links.length }}
            <icon :name="trash ? 'history' : 'external-link-alt'" scale="0.8"></icon>
          </span>
        </div>
      </div>

      <div class="mute empty item txt-c" v-if="!hasLinks && !edit.active">
        There's nothing here.
      </div>

      <draggable
        v-model="self.links"
        :options="{ handle: '.grab', group: 'items' }"
        @start="drag = true"
        @end="drag = false">

        <card-item
          v-for="(link, key) in self.links"
          :id="id"
          :key="link.id"
          :self="link"
          :trash="trash"
          v-show="visible(key)"
          @editItem="amend(key)"
          @remItem="remove(key)"
          @resItem="restore(link, key)">
        </card-item>
      </draggable>

      <card-editor
        v-if="edit.active"
        :board="id"
        :item="edit.item"
        @finished="finished"> 
      </card-editor>

      <div class="footer on-h ctr row">
        <div class="bare col is-h txt-c">
          <span class="opt" v-if="overflow" @click="show = !show">
            {{ show ? 'Hide' : 'Show' }}
            {{ self.links.length - links }}
          </span>
        </div>
        <div @click="show = !show"
          :class="['bare col none txt-c', { opt: overflow }]">
          <icon name="ellipsis-h"></icon>
        </div>
        <div class="col is-h txt-c">
          <span class="main opt" v-if="!trash" @click="create()">
            <span>New</span>
          </span>
          <span class="bad opt" v-if="trash" @click="remove()">
            <span>Delete All</span>
          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import CardItem from './CardItem.vue'
  import CardEditor from './CardEditor.vue'

  export default {
    props: ['id', 'self', 'trash'],
    data() { 
      return { 
        show: false, 
        drag: false,
        edit: { item: false, active: false },
      }
    },
    computed: {
      filter()    { return this.$store.state._.filter },
      links()     { return this.$store.state.view.links },
      overflow()  { return this.self.links.length > this.links },
      headClass() { return `m-0 ${ this.trash ? '' : 'grab'}` },
      optsClass() { return `col none opt ${this.trash ? 'good' : 'bare'}` },
      hasLinks()  { return this.self.links && this.self.links.length }
    },
    methods: {
      finished()   { return this.edit.active = false },
      filtered()   { return this.$filtered(this.filter, this.self, true) },
      amend(thing) { this.edit.item = thing, this.edit.active = !this.edit.active },
      handleOpt()  { return this.trash ? this.restore() : this.openAll() },
      openAll()    { return this.$$.openAll(this.self.links) },
      visible(key) {
        if (this.edit.active) return false;
        return this.show || key < this.links || this.filter.active || this.drag
      },
      create() {
        this.$store.commit('create_link', { board: this.id })
        this.amend(this.self.links.length - 1)
      },
      remove(id) {
        if (id || id === 0) this.self.links.splice(id, 1)
        else if (this.id == 'links') this.self.links = []
        else this.$store.state.trash.boards.splice(this.id, 1)
        this.$store.commit('refresh')
      },
      restore(tack, key) {
        if (tack) {
          let board = this.$$.xById(this.$store.state.boards, tack.board)
          if (board < 0) return this.$$.toast("Unknown Board.")
          delete tack.board
          this.$store.state.boards[board].links.push(tack)
          this.$store.state.trash.links.splice(key, 1)
        } else {
          if (this.id != 'links') {
            this.$store.state.boards.push(this.$store.state.trash.boards[this.id])
            this.$store.state.trash.boards.splice(this.id, 1)
          } else {
            for (var i = this.$store.state.trash.links.length - 1; i >= 0; i--) {
              this.restore(this.$store.state.trash.links[i], i)
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
  .col.opt .fa-icon {
    margin-left: .5em;
  }
  .footer {
    padding-top: .5em;
  }
</style>