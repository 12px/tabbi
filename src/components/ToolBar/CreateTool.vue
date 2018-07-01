<template>
  <div class="creator" @keyup.escape="clear">
    
    <b-field class="create-tool" v-if="view =='toggle'">
      <span class="control" @click="view = 'board'">
        <button class="button is-rounded is-small is-primary is-outlined">
          <icon name="plus-circle" scale="0.7"></icon> Board
        </button>
      </span>
      <span class="control" @click="view = 'link'">
        <button class="button is-rounded is-small is-primary is-outlined">
          <icon name="plus-circle" scale="0.7"></icon> Link
        </button>
      </span>
    </b-field>

    <div class="box" v-if="view != 'toggle'">
      <b-field>
        <b-input v-focus placeholder="Name" v-model="name" 
          @keyup.native.enter="create()"></b-input>
      </b-field>

      <div v-if="view == 'link'">
        <b-field>
          <b-input placeholder="Link URL" v-model="link" 
            @keyup.native.enter="create()"></b-input>
        </b-field>

        <b-field>
          <b-select placeholder="Choose Board" v-model="board">
            <option v-for="brd in $store.state.boards" :value="brd.id">
              {{ brd.name }}
            </option>
          </b-select>
        </b-field>

        <b-field>
          <b-input placeholder="Add Tag" v-model="nTag" expanded 
            @keyup.native.enter="addTag"></b-input>

          <div class="control">
            <button class="button" @click="addTag">
              <icon name="check"></icon>
            </button>
          </div>
        </b-field>

        <b-taglist>
          <b-tag v-for="(tag, i) in tags" :key="i">
            <strong>#{{ tag }}</strong>
            <span @click="remTag(i)">
              <icon class="opt" name="times" scale="0.65"></icon>
            </span>
          </b-tag>
        </b-taglist>
      </div>

      <b-field grouped position="is-right">
        <button class="button is-white" @click="clear">Cancel</button>
        <button class="button is-inverted is-primary" @click="create()">
          Confirm
        </button>
      </b-field>
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
      create() {
        if (!this.name) return alert('No Name Specified.')
        if (this.view == 'board') this.$store.commit('new_board', this.name)
        if (this.view == 'link') {
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

  .create-tool .fa-icon {
    margin-right: 0.5em;
  }
</style>