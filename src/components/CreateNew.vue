<template>
  <div class="accent container" id="creator" @keyup.escape="clear">

    <div class="ctr row tabs p-t">
      <div class="col">
        <a href="#" :class="active('board')" 
          @click="$store.commit('show_create_new', 'board')">New Board</a>

        <a href="#" :class="active('link')" 
          @click="$store.commit('show_create_new', 'link')">New Link</a>
      </div>
    </div>

    <div class="row">
      <div class="col w-33">
        <input type="text" placeholder="Name" 
          v-focus v-model="name" @keyup.enter="createNew">
      </div>
      <div class="col w-33" v-if="create.thing == 'link'">
        <input type="text" placeholder="Link URL"
          v-model="link" @keyup.enter="createNew">
      </div>
      <div class="col w-33" v-if="create.thing == 'link'">
        <select>
          <option v-for="brd in $store.state.boards" :value="brd.id">
            {{ brd.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="row" v-if="create.thing == 'link'">
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
    data() { return { 
      name: '', link: '', nTag: '', tags: []
    } },
    computed: {
      create() { return this.$store.state.create },
      board: {
        get()    { return this.$store.state.lastUsed },
        set(val) { return this.$store.commit('set_last_used', val) }
      }
    },
    methods: {
      active(i) { return this.create.thing == i ? 'active' : 'mute' },
      remTag(i) { this.tags.splice(i, 1) },
      addTag()  { if (!this.nTag) return alert('No Tag Specified.')
                  this.tags.push(this.nTag)
                  this.nTag = '' },
      clear() {
        this.tags = []
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.$store.commit('close_create_new')
      },
      createNew() {
        if (!this.name) return alert('No Name Specified.')
        if (this.create.thing == 'board') this.$store.commit('new_board', this.name)
        if (this.create.thing == 'link') {
          if (!this.link) return alert('No URL Specified.')
          if (this.board < 1) return alert('No Board Specified')

          let index = this.$$.xById(this.$store.state.boards, this.board)

          this.$store.commit('new_link', { 
            name: this.name, link: this.link, board: index, tags: this.tags  
          })
        }
        this.clear()
      }
    }
  }
</script>

<style scoped>
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