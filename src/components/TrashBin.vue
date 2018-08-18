<template>
  <div class="pin-board" v-show="!filtered()">
    
    <div class="mute name ctr row">
      <div class="col">
        <h6 class="m-0 on-h">
          {{ self.name }}
        </h6>
      </div>
      <div class="good col none on-h opt" 
        v-if="!id == 'links' || hasLinks" @click="restore">
        <span class="is-h hl">Restore</span>
        <icon name="history" scale="0.8"></icon>
      </div>
    </div>

    <div class="card">
      <div class="mute txt-c" v-if="!hasLinks">
        This board is empty.
      </div>

      <thumb-tack 
        v-for="(tack, key) in self.links"
        :key="tack.id" :self="tack"
        :trash="id" v-show="visible(key)" 
        v-on:remTack="removeTack(key)"
        v-on:resTack="restoreTack(tack, key)">
      </thumb-tack>

      <div class="row m-0" v-if="hasLinks">
        <div class="mute col">
          <div v-if="overflow">
            <span class="opt" v-show="show" @click="show = false">Show Less</span>
            <span class="opt" v-show="!show" @click="show = true">Show More</span>
          </div>
        </div>
        <div class="bad col txt-r">
          <div v-if="!id == 'links' || hasLinks">
            <span class="opt" @click="remove">
              {{ id == 'links' ? 'Delete All' : 'Delete Board'}}
            </span>
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

<style></style>