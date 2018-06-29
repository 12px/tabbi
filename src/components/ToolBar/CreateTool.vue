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

    <div class="field has-addons" v-if="view == 'board'">
      <div class="field-label is-small opt muted" @click="clear">
        <icon name="times"></icon>
      </div>
      <div class="field-body">
        <span class="control">
          <input type="text" class="input is-small is-rounded" 
            placeholder="Board Name" v-model="name" @keyup.enter="create('board')">
        </span>
        <span class="control" @click="create('board')">
          <button class="button is-rounded is-small is-primary has-text-white">
            <icon name="check"></icon>
          </button>
        </span>
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
      clear() {
        this.tags = []
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.view = 'toggle'
      },
      create(type) {
        if (!this.name) return alert('No Name Specified.')
        if (!this.link && type == 'link') return alert('No URL Specified.')
        if (this.board < 1 && type == 'link') return alert('No Board Specified.')

        if (type == 'board') this.$store.commit('new_board', this.name)
        if (type == 'link') {
          this.$store.commit('new_link', {
            name: this.name,
            link: this.link,
            board: this.board,
            tags: this.tags
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
</style>