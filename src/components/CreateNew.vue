<template>
  <div class="accent" id="creator" 
    @keyup.escape="clear" v-if="creator.active">

    <div class="ctr row tabs p-t">
      <div class="col">
        <a href="#" :class="is('board')" @click="creator.thing = 'board'">
          New Board
        </a>
        <a href="#" :class="is('link')" @click="creator.thing = 'link'">
          New Link
        </a>
      </div>
    </div>

    <div class="row">
      <div class="col w-33">
        <input type="text" placeholder="Name" 
          v-focus v-model="name" @keyup.enter="createNew">
      </div>
      <div class="col w-33" v-if="creator.thing == 'link'">
        <input type="text" placeholder="Link URL"
          v-model="link" @keyup.enter="createNew">
      </div>
      <div class="col w-33" v-if="creator.thing == 'link'">
        <select v-model="board">
          <option v-for="brd in $store.state.boards" :value="brd.id">
            {{ brd.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="row" v-if="creator.thing == 'link'">
      <div class="col w-33">
        <input type="text" placeholder="Add Tag" v-model="nTag" @keyup.enter="addTag">
      </div>
      <div class="col w-66">
        <div class="tags">
          <span class="tag" v-for="(tag, i) in tags" :key="i">
            <strong>#{{ tag }}</strong>
            <span @click="remTag(i)">
              <icon name="times" scale="0.8"></icon>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="row p-b">
      <div class="col">
        <button class="otln" @click="clear">Cancel</button>
        <button @click="createNew">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'creator' ],
    data() { return {  name: '', link: '', nTag: '', tags: [] } },

    computed: {
      meta()   { return this.$store.state.meta },
      board: {
        get()    { return this.meta.lastBoard },
        set(val) { return this.$store.commit('update_meta', { lastBoard: val }) }
      }
    },
    methods: {
      is(i) { return this.creator.thing == i ? 'active' : 'mute' },

      remTag(i) { this.tags.splice(i, 1) },
      addTag()  { if (!this.nTag) return this.$$.toast('No Tag Specified.')
                  this.tags.push(this.nTag)
                  this.nTag = '' },
      clear() {
        this.tags = []
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.creator.active = false
      },
      createNew() {
        if (!this.name) return this.$$.toast('No Name Specified.')
        if (this.creator.thing == 'board') this.$store.commit('create_board', this.name)
        if (this.creator.thing == 'link') {
          if (!this.link) return this.$$.toast('No URL Specified.')
          if (this.board < 1) return this.$$.toast('No Board Specified')

          let index = this.$$.xById(this.$store.state.boards, this.board)

          this.$store.commit('create_link', { 
            name: this.name, link: this.link, board: index, tags: this.tags  
          })
        }
        this.clear()
      }
    }
  }
</script>

<style scoped>
  #creator {
    margin: 0 -5vw;
    padding: 0 5vw;
  }
  .row {
    margin-bottom: 0;
  }
  .col {
    margin: 0;
    padding: 0.5em 1em;
  }
  .tabs a {
    border: none;
    margin-right: .5em;
  }
  .tabs .active {
    font-weight: bold;
    border-bottom: 1px solid;
  }
  button {
    padding: 0 1em;
    margin-right: 0.5em;
  }
</style>