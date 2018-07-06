<template>
  <div class="creator" @keyup.escape="clear">

    <div class="box is-primary-border">
      <b-field>
        <b-input v-focus placeholder="Name" v-model="name" 
          @keyup.native.enter="createNew()"></b-input>
      </b-field>

      <div v-if="create.thing == 'link'">
        <b-field>
          <b-input placeholder="Link URL" v-model="link" 
            @keyup.native.enter="createNew()"></b-input>
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
        <button class="button is-inverted is-primary" @click="createNew()">
          Confirm
        </button>
      </b-field>
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
      alert(m) { this.$toast.open(this.$$.toast(m)) },
      remTag(i) { this.tags.splice(i, 1) },
      addTag()  { if (!this.nTag) return this.alert('No Tag Specified.')
                  this.tags.push(this.nTag)
                  this.nTag = '' },
      clear() {
        this.tags = []
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.$store.commit('close_create_new')
        this.$goog.saveData(this.$store.state).then((data) => {
          console.log(data)
        })
      },
      createNew() {
        if (!this.name) return this.alert('No Name Specified.')
        if (this.create.thing == 'board') this.$store.commit('new_board', this.name)
        if (this.create.thing == 'link') {
          if (!this.link) return this.alert('No URL Specified.')
          if (this.board < 1) return this.alert('No Board Specified')

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
  .creator {
    margin-bottom: 1rem;
  }
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

  .creator .box {
    margin-top: 1px;
    min-width: 268px;
  }

  .create-tool .fa-icon {
    margin-right: 0.5em;
  }
</style>