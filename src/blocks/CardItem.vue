<template>
  <div class="item has-hint" v-show="!filtered()">
    <i v-if="source != 'sessions'" :class="['grab mute fas', prefix]"></i>
    <a class="link" :href="self.link" @click="handleLink">
      {{ self.name }}
    </a>
    <a class="hint" href="#" 
      v-if="source == 'trash' && id == 'links'"
      @click="$emit('resItem')">
      <i class="mute fas fa-history"></i>
    </a>
    <a v-if="source != 'sessions'" class="hint" href="#" @click="doOption()">
      <i :class="['mute fas', option]"></i>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['id', 'self', 'source'],
    computed: {
      filter() { return this.$store.state._.filter },
      tagged() { return this.self.tags && this.self.tags.length },
      prefix() { return this.tagged ? 'fa-tag' : 'fa-sort' },
      option() { return this.source == 'boards' ? 'fa-pencil-alt' : 'fa-trash-alt' },
      tags() { return this.filter.active && this.filter.by == 'tag' },

      board() {
        let index = this.$$.xById(this.$store.state.boards, this.self.board)
        return this.$store.state.boards[index]
      }
    },
    methods: {
      filtered() { return this.$filter.out(this.filter, this.self) },
      doOption() { 
        return this.$emit(this.source != 'trash' ? 'editItem' : 'remItem') 
      },
      handleLink(e) {
        if (chrome.identity && this.$root.popup) {
          console.log(e)
          chrome.tabs.create({ url: e.target.href })
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    display: flex;
    align-items: center;
  }
  .grab, .hint {
    flex-shrink: 0;
    flex-basis: 1.2rem;
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
  .fa-history,
  .fa-pencil-alt,
  .fa-trash-alt {
    font-size: 0.8em;
  }
  .fa-tag {
    font-size: 0.7em;
  }
</style>