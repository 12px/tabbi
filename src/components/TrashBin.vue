<template>
  <div class="pin-board" v-show="!filtered()">
    
    <div class="mute name ctr row">
      <div class="col">
        <h6 class="m-0 on-h">
          {{ self.name }}
        </h6>
      </div>
      <div class="good col none on-h opt" 
        v-if="!links || hasLinks" @click="restoreAll">
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

      <div class="row m-0">
        <div class="mute col">
          <div v-if="overflow">
            <span class="opt" v-show="show" @click="show = false">Show Less</span>
            <span class="opt" v-show="!show" @click="show = true">Show More</span>
          </div>
        </div>
        <div class="bad col txt-r">
          <div v-if="!links || hasLinks">
            <span class="opt" v-show="links" @click="removeAll">Delete All</span>
            <span class="opt" v-show="!links" @click="removeBoard">Delete Board</span>
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
      links()    { return this.id == 'links' },
      hasLinks() { return this.self.links.length },
      filter()   { return this.$store.state.filter },
      rows()     { return this.$store.state.view.rows },
      overflow() { return this.self.links.length > this.rows && !this.filter.active }
    },
    methods: {
      filtered()   { return this.$$.filtered(this.filter, this.self, true) },
      visible(key) { return this.show || key < this.rows || this.filter.active },

      removeAll()    { this.$store.commit('remove_all_tacks') },
      removeTack(id) { this.$store.commit('remove_tack', id) },
      removeBoard()  { this.$store.commit('remove_board', this.id) },
      restoreAll() { 
        // restore board
        if (!this.links) return this.$store.commit('restore_board', this.id)
        // restore all links
        let t = this.trashed
        for (var i = t.length - 1; i >= 0; i--) this.restoreTack(t[i])
      },
      restoreTack(tack, key) {
        let board = this.$$.xById(this.$store.state.boards, tack.board)
        if (board < 0) return this.$toast.open(this.$$.toast('Unknown Board'))
        this.$store.commit('restore_tack', { link: tack, id: key, board })
      }
    },
    components: { ThumbTack }
  }
</script>

<style></style>