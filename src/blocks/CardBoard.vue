<template>
  <div v-show="!filtered()">
    <div class="card has-hint">
      <h6 :class="{ grab: !this.trash }">
        {{ self.name }}
        <a href="#" class="hint float-right" @click="openCard()">
          <i class="mute fas fa-external-link-alt"></i>
        </a>
      </h6>

      <div class="nothing align-center" v-if="!hasLinks && !edit.active">
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

      <div class="overflow row align-center">
        <div class="col-xs-4">
          <a href="#" class="hint" v-if="!trash" @click="amend('board')">
            Edit
          </a>
          <a href="#" class="hint bad" v-if="trash" @click="remove()">
            <strong>Delete</strong>
          </a>
        </div>
        <div class="col-xs-4">
          <a href="#" @click="show = !show">
            <i class="mute fas fa-ellipsis-h"></i>
          </a>
        </div>
        <div class="col-xs-4">
          <a class="hint" href="#" v-if="!trash" @click="create()">
            <strong>New</strong>
          </a>
          <a href="#" class="hint good" v-if="trash" @click="restore()">
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
    props: ['id', 'self', 'trash'],
    data() { 
      return { 
        show: false,
        drag: false,
        edit: { item: false, active: false } 
      } 
    },
    computed: {
      filter()   { return this.$store.state._.filter },
      links()    { return this.$store.state.view.links },
      overflow() { return this.self.links.length > this.links },
      hasLinks() { return this.self.links && this.self.links.length }
    },
    methods: {
      finished() { return this.edit.active = false },
      filtered() { return this.$filtered(this.filter, this.self, true) },
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
  h6 a {
    margin-top: -2px;
  }
  .fa-external-link-alt {
    font-size: 0.8rem;
  }
  .card {
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
</style>