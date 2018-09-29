<template>
  <div class="item has-hint" v-show="!filtered()">
    <i :class="['grab mute fas fa-flip-horizontal', prefix]"></i>
    <a :href="self.link">
      {{ self.name }}
    </a>
    <a class="hint float-right" href="#" 
      v-if="!item && id == 'links'"
      @click="$emit('resItem')">
      <i class="mute fas fa-history"></i>
    </a>
    <a class="hint float-right" href="#" @click="doOption()">
      <i :class="['mute fas', option]"></i>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['id', 'self', 'trash'],
    computed: {
      item() { return !this.trash && this.trash !== 0 },
      filter() { return this.$store.state._.filter },
      tagged() { return this.self.tags && this.self.tags.length },
      prefix() { return this.tagged ? 'fa-tag' : 'fa-sort' },
      option() { return this.item ? 'fa-pencil-alt' : 'fa-trash-alt' },
      tags() { return this.filter.active && this.filter.by == 'tag' },

      board() {
        let index = this.$$.xById(this.$store.state.boards, this.self.board)
        return this.$store.state.boards[index]
      }
    },
    methods: {
      doOption() { return this.$emit(this.item ? 'editItem' : 'remItem') },
      filtered() { return this.$filtered(this.filter, this.self) }
    }
  }
</script>

<style scoped>
  .fa-flip-horizontal {
    margin: 0 5px 0 -5px;
  }
  .fa-sort {
    width: 1em;
  }
  .fa-history,
  .fa-pencil-alt
  .fa-trash-alt {
    font-size: 0.8em;
  }
  .fa-history {
    margin-left: 5px;
  }
  .fa-tag {
    width: 1.4em;
    font-size: 0.7em;
    display: inline-block;
  }
  a {
    font-weight: 600;
  }
</style>