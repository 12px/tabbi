<template>
  <div class="pin-board" v-show="!filtered()">

    <div class="name columns is-mobile">
      <div class="column has-hint">
        <strong class="muted grab">{{ self.name }}</strong>
      </div>
      <div class="opt column none has-hint muted" 
        v-if="!links || hasLinks" @click="restore()">
        <strong class="hint hl muted">
          <small v-if="!links">Restore Board</small>
          <small v-if="links && !this.filter.active">Restore All</small>
        </strong>
        <icon name="history" scale="0.8" v-if="!this.filter.active"></icon>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered muted" v-if="!hasLinks">
        This board is empty.
      </div>

      <thumb-tack 
        v-for="(tack, key) in self.links" 
        :key="tack.id" :self="tack" 
        :trash="id" v-show="visible(key)" 
        v-on:remTack="remove(key)" 
        v-on:resTack="restore(tack)">
      </thumb-tack>

      <div class="show muted has-text-centered" v-if="overflow">
        <small class="opt" v-show="show" @click="show = false">Show Less</small>
        <small class="opt" v-show="!show" @click="show = true">Show More</small>
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

      remove(id) {},
      restore(t) {
        if (!t && !this.links) this.$store.commit('restore_board', this.id)
      }
    },
    components: { ThumbTack }
  }
</script>

<style>
  .has-hint:not(:hover) > .hint { 
    opacity: 0; 
  }
  .hint.hl { 
    padding-right: 0.5em;
  }
  .hint.hr { 
    padding-left: 0.5em;
  }
  .name .column {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: -0.5rem;
  }
  .pin-board .show {
    margin-top: .5em;
  }
</style>