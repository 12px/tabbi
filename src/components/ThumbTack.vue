<template>
  <div class="tack" v-show="!filtered()">

    <div class="ctr row on-h">
      <div class="col link">
        <div class="grab prefix fl-l bare" v-if="!trash && trash !== 0">
          <icon :class="preclass" :name="prefix" 
            flip="horizontal" :scale="prescale">
          </icon>
        </div>
        <a class="nice" :href="self.link">{{ self.name }}</a>
      </div>

      <div class="col none is-h" v-if="!trash && trash !== 0">
        <span class="opt bare" @click="$emit('editTack')">
          <icon name="pencil-alt" scale="0.7"></icon>
        </span>
      </div>

      <div class="col trash none is-h" v-if="trash || trash === 0">
        <span class="opt bare" @click="$emit('remTack')">
          <icon name="trash-alt" scale="0.7"></icon>
        </span>
        <span class="opt is-h bare" @click="$emit('resTack')">
          <icon name="history" scale="0.7"></icon>
        </span>
      </div>
    </div>

    <div class="row" v-if="showTags || trash || trash === 0">
      <div class="col tags">
        <span class="tag" v-if="trashed"><strong>{{ boardName }}</strong></span>
        <span class="tag" v-for="(tag, i) in self.tags" :key="i">
          #{{ tag }}
        </span>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: ['self', 'trash'],
    computed: {
      trashed()  { return this.trash && this.trash == 'links' },
      filter()   { return this.$store.state._.filter },
      tagged()   { return this.self.tags && this.self.tags.length },
      prefix()   { return this.tagged ? 'tag' : 'sort' },
      prescale() { return this.tagged ? '0.65' : '1' },
      preclass() { return this.tagged ? 'tagged' : '' },
      showTags() { return this.filter.active && this.filter.by == 'tag' },
      board()    { let index = this.$$.xById(this.$store.state.boards, this.self.board)
                   return this.$store.state.boards[index] },
      boardName() { return this.board.name ? this.board.name : 'Removed' }
    },
    methods: {
      oh() { console.log(this.self) },
      filtered() { return this.$$.filtered(this.filter, this.self); }
    }
  }
</script>

<style lang="less">
  .tack {
    padding-top: .2em;

    .row { margin-bottom: 0; }
    .col { padding: 0 1em; }

    .link { overflow: hidden; }

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
  }
</style>