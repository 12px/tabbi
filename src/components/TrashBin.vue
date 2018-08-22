<template>
  <div class="pin-board" v-show="!filtered()">

    <div class="card">
      <div class="header on-h">
        <div class="ctr row">
          <div class="mute col">
            <h6 class="m-0">{{ self.name }}</h6>
          </div>
          <div class="good col none opt" @click="restore" v-if="hasLinks">
            <span class="is-h hl">Restore</span>
            <icon name="history" scale="0.8"></icon>
          </div>
        </div>
      </div>
      <div class="empty mute txt-c" v-if="!hasLinks">
        This board is empty.
      </div>

      <thumb-tack 
        v-for="(tack, key) in self.links"
        :key="tack.id" 
        :self="tack"
        :trash="id" 
        v-show="visible(key)" 
        v-on:remTack="removeTack(key)"
        v-on:resTack="restoreTack(tack, key)">
      </thumb-tack>

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
          <div class="bad col is-h txt-c">
            <div v-if="id != 'links' || hasLinks">
              <span class="opt" @click="remove">Delete All</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import ThumbTack from './ThumbTack.vue'

  export default {
    props: ['self', 'id'],
    data() { return { 
      show: false
    } },
    computed: {
      more()     { return { 
        'bare col none txt-c': 1, 'opt': this.self.links.length > this.links } 
      },
      trashed()  { return this.$store.state.trash.links },
      hasLinks() { return this.self.links.length },
      filter()   { return this.$store.state._.filter },
      links()    { return this.$store.state.view.links },
      overflow() { return this.self.links.length > this.links && !this.filter.active }
    },
    methods: {
      filtered()   { return this.$$.filtered(this.filter, this.self, true) },
      visible(key) { return this.show || key < this.links || this.filter.active },

      remove() {
        if (this.id == 'links') this.self.links = []
        else this.$store.state.trash.boards.splice(this.id, 1)
        this.$store.commit('refresh')
      },

      removeTack(id) {
        this.self.links.splice(id, 1)
        this.$store.commit('refresh')
      },

      restore() {
        if (this.id == 'links') {
          for (var i = this.trashed.length - 1; i >= 0; i--) {
            this.restoreTack(this.trashed[i], i)
          }
        }
        else {
          this.$store.state.boards.push(this.$store.state.trash.boards[this.id])
          this.$store.state.trash.boards.splice(this.id, 1)
        }
        this.$store.commit('refresh')
      },

      restoreTack(tack, key) {
        let board = this.$$.xById(this.$store.state.boards, tack.board)
        if (board < 0) return this.$$.toast('Unknown Board')
        delete tack.board
        this.$store.state.boards[board].links.push(tack)
        this.$store.state.trash.links.splice(key, 1)
        this.$store.commit('refresh')
      }
    },
    components: { ThumbTack }
  }
</script>

<style scoped>
  h6 { font-weight: 400; }
  .empty {
    padding: 1em 0;
  }
  .footer {
    padding-top: .5em;
  }
</style>