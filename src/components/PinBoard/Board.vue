<template>
  <div class="board" v-show="!filtered()">

    <div class="name columns is-mobile">
      <div class="column has-hint">
        <strong class="muted">{{ self.name }}</strong>
        <span class="hint hr muted">
          <icon class="opt" name="pencil-alt" scale="0.7"></icon>
        </span>
      </div>
      <div class="opt column none has-hint muted">
        <strong class="hint hl muted">
          <small>Open {{ self.links.length}}</small>
        </strong>
        <icon name="external-link-alt" scale="0.8"></icon>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered muted" v-if="!self.links.length">
        This board is empty.
      </div>

      <tack v-for="(tack, key) in self.links" :key="tack.id" :self="tack"
        v-show="visible(key)">
      </tack>


      <div class="show muted has-text-centered" v-if="over">
        <small class="opt" v-show="show" @click="show = false">Show Less</small>
        <small class="opt" v-show="!show" @click="show = true">Show More</small>
      </div>
    </div>
  </div>
</template>

<script>
  import Tack from './Tack.vue'

  export default {
    props: ['self', 'id'],
    data() { return { 
      show: false
    } },
    computed: {
      filter() { return this.$store.state.filter },
      rows()   { return this.$store.state.view.rows },
      over()   { return this.self.links.length > this.rows }
    },
    methods: {
      filtered() { 
        return this.$pd.filtered(this.filter, this.self.name, this.self.links, true) 
      },
      visible(key) {
        return this.show || key < this.rows || this.filter.active
      }
    },
    components: { Tack }
  }
</script>

<style lang="scss">
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
  .board .show {
    margin-top: .5em;
  }
</style>