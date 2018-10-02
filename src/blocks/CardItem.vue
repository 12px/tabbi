<template>
  <div class="item has-hint" v-show="!filtered()">
    <i :class="['grab mute fas', prefix]"></i>
    <a class="link" :href="self.link">
      {{ self.name }}
    </a>
    <a class="hint" href="#" 
      v-if="!item && id == 'links'"
      @click="$emit('resItem')">
      <i class="mute fas fa-history"></i>
    </a>
    <a class="hint" href="#" @click="doOption()">
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
      filtered() { return this.$filter.out(this.filter, this.self) }
    }
  }
</script>

<style scoped>
  .item {
    display: flex;
    align-items: center;
  }
  .grab {
    flex-shrink: 0;
    flex-basis: 2rem;
  }
  .link {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hint {
    margin-left: auto;
  }
  a {
    font-weight: 600;
    display: inline-block;
  }
</style>