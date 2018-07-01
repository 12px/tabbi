<template>
  <div class="tack" v-show="!filtered()">

    <div class="columns is-marginless is-mobile">
      <div class="column is-clipped">
        <div class="prefix is-pulled-left barely">
          <icon :name="prefix"  flip="horizontal" :scale="prescale"></icon>
        </div>
        <a :href="self.link">{{ self.name }}</a>
      </div>

      <div class="column none is-flex-mobile">
        <span class="opt muted">
          <icon name="pencil-alt" scale="0.7"></icon>
        </span>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: ['self'],
    computed: {
      filter()   { return this.$store.state.filter },
      tagged()   { return this.self.tags && this.self.tags.length },
      prefix()   { return this.tagged ? 'tag' : 'sort' },
      prescale() { return this.tagged ? '0.65' : '1' }
    },
    methods: {
      filtered() { return this.$$.filtered(this.filter, this.self); }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all.sass';

  .tack {
    a { 
      color: $text;
      display: block; 
      overflow: hidden;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .column {
      padding: .2em 0 0 0;
    }

    .fa-icon {
      margin-bottom: 0.2rem;
      vertical-align: middle;
    }

    &:hover {
      a {
        color: $primary;
      }
    }

    &:not(:hover) .none {
      display: none;
    }

    .prefix {
      width: 1.25em;
    }
  }
</style>