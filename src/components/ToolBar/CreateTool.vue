<template>
  <div class="creator" @keyup.escape="clear">
    
    <div class="field has-addons" v-if="view == 'toggle'">
      <div class="field-label is-small">New</div>
      <div class="field-body">
        <span class="control" @click="view = 'board'">
          <button class="button is-rounded is-small is-light">Board</button>
        </span>
        <span class="control" @click="view = 'link'">
          <button class="button is-rounded is-small is-light">Link</button>
        </span>
      </div>
    </div>

    <div class="box has-background-primary" v-if="view != 'toggle'">
      <div v-if="view == 'board'">
        <div class="field">
          <div class="control is-expanded">
            <input class="input" type="text" v-focus
              placeholder="Board Name" v-model="name" @keyup.enter="create('board')">
          </div>
        </div>
      </div>

      <div v-if="view == 'link'">
        <div class="field">
          <span class="control is-expanded">
            <input type="text" class="input" v-focus
              placeholder="Link Name" v-model="name" @keyup.enter="create('link')">
          </span>
        </div>

        <div class="field">
          <span class="control is-expanded">
            <input type="text" class="input" 
              placeholder="Link URL" v-model="link" @keyup.enter="create('link')">
          </span>
        </div>

        <div class="field">
          <div class="control">
            <div class="select">
              <select v-model="board">
                <option value="0">Choose Board</option>
                <option v-for="brd in $store.state.boards" :value="brd.id">
                  {{ brd.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" type="text" 
              placeholder="Add New Tag" v-model="nTag" @keyup.enter="addTag">
          </div>
          <div class="control">
            <a class="button" @click="addTag">
              <icon name="check"></icon>
            </a>
          </div>
        </div>
        <div class="tags">
          <strong class="tag" v-for="(tag, i) in tags">
            #{{ tag }}
            <span @click="remTag(i)">
              <icon class="opt" name="times" scale="0.65"></icon>
            </span>
          </strong>
        </div>
      </div>


      <div class="buttons is-right">
        <button class="button is-white" @click="clear">
          Cancel
        </button>
        <button v-if="view == 'link'" 
          class="button is-inverted is-primary" @click="create('link')">
          Add Link
        </button>
        <button v-if="view == 'board'" 
          class="button is-inverted is-primary" @click="create('board')">
          Add Board
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() { return { 
      view: 'toggle', name: '', link: '', nTag: '', tags: []
    } },
    computed: {
      board: {
        get()    { return this.$store.state.lastUsed },
        set(val) { return this.$store.commit('set_last_used', val) }
      }
    },
    methods: {
      remTag(i) { this.tags.splice(i, 1) },
      addTag()  { if (!this.nTag) return alert("No Tag Specified")
                  this.tags.push(this.nTag)
                  this.nTag = '' },
      clear() {
        this.tags = []
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.view = 'toggle'
      },
      create(type) {
        if (!this.name) return alert('No Name Specified.')
        if (type == 'board') this.$store.commit('new_board', this.name)
        if (type == 'link') {
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

<style>
  .creator .field-label {
    flex: none;
    margin-right: 0;
    padding-right: 1em;
  }

  .tags .fa-icon {
    margin-top: 0.35rem;
    margin-left: 0.35rem;  
  }

  .creator .buttons {
    margin-top: 1em;
  }
</style>