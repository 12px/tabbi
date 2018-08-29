<template>
  <div class="item" 
    v-show="!filtered()">
  
    <div class="ctr row on-h">  
      <div class="name col">
        <div class="grab prefix fl-l bare" v-if="item">
          <icon 
            :name="prefix"
            :class="preClass"
            :scale="preScale"
            flip="horizontal">
          </icon>
        </div>
        <a :href="self.link" class="nice">
          {{ self.name }}
        </a>
      </div>

      <div :class="['col none is-h', { trash }]">
        <span class="opt bare"
          @click="handleOpt()">
          <icon :name="optIcon" scale="0.7"></icon>
        </span>
        <span v-if="!item && id == 'links'"
          class="opt bare is-h"
          @click="$emit('resItem')">
          <icon name="history" scale="0.7"></icon>
        </span>
      </div>
    </div>

    <div class="row" v-if="showTags || !item">
      <div class="col tags">
        <code class="tag" v-if="!item && id == 'links'">
          {{ board && board.name ? ':' + board.name : 'Removed' }}
        </code>
        <code class="tag" v-for="(tag, i) in self.tags" :key="i">
          #{{ tag }}
        </code>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['id', 'self', 'trash'],
    computed: {
      item()     { return !this.trash && this.trash !== 0 },
      filter()   { return this.$store.state._.filter },
      tagged()   { return this.self.tags && this.self.tags.length },
      prefix()   { return this.tagged ? 'tag' : 'sort' },
      preScale() { return this.tagged ? '0.65' : '1' },
      preClass() { return { tagged: this.tagged } },
      optIcon()  { return this.item ? 'pencil-alt' : 'trash-alt' },
      showTags() { return this.filter.active && this.filter.by == 'tag' },

      board() {
        let index = this.$$.xById(this.$store.state.boards, this.self.board)
        return this.$store.state.boards[index]
      },
    },
    methods: {
      handleOpt() { return this.$emit(this.item ? 'editItem' : 'remItem') },
      filtered()  { return this.$$.filtered(this.filter, this.self) }
    }
  }
</script>

<style scoped>
  .item {
    padding-top: .2em;
  }
  .name {
    overflow: hidden;
  }
  .row {
    margin-bottom: 0;
  }
  .col {
    padding: 0 1em;
  }
  a {
    border: none;
    display: block;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 0.1em;
  }
  .prefix {
    width: 1.25em;
    margin-top: -0.1em;
  }
  .tagged {
    margin-top: .4em;
  }
  .fa-icon { vertical-align: top; }
  .is-h .fa-icon { margin-top: .3em; }
  .trash .fa-icon { margin-left: 0.5em; }
</style>