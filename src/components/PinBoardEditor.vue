<template>
  <div class="editor" @keyup.escape="finish">

    <div v-if="!link">
      <input type="text" v-focus placeholder="Board Name" 
        v-model="self.name" @keyup.enter="finish">
    </div>

    <div v-if="link">
      <input type="text" v-focus placeholder="Link Name" 
        v-model="link.name" @keyup.enter="finish">

      <input type="text" placeholder="Link URL" 
        v-model="link.link" @keyup.enter="finish">

      <select v-model="lBoard">
        <option value="0">Change Board</option>
        <option v-for="(brd, key) in $store.state.boards" :value="key"
          v-if="self.id != brd.id">{{ brd.name }}</option>
      </select>

      <input type="text" placeholder="Add Tag" v-model="lTag" 
        @keyup.enter="addTag">

      <div class="tags">
        <span class="tag" v-for="(tag, i) in link.tags" :key="i">
          <strong>#{{ tag }}</strong>
          <span @click="remTag(i)">
            <icon name="times" scale="0.8"></icon>
          </span>
        </span>
      </div>
    </div>

    <div class="bottom row">
      <div class="col txt-c">
        <span class="mute opt" @click="finish">
          <icon name="times"></icon>
        </span>
      </div>
      <div class="col txt-c">
        <span class="bad opt" @click="trash">
          <icon name="trash-alt"></icon>
        </span>
      </div>
      <div class="col txt-c">
        <span class="good opt" @click="finish">
          <icon name="check"></icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['board', 'item'],
    data() { return {
      lTag: '',
      lBoard: 0
    } },
    computed: {
      self() { return this.$store.state.boards[this.board] },
      link() { return this.self.links[this.item] }
    },
    methods: {
      remTag(i) { this.link.tags.splice(i, 1) },
      addTag()  { if (!this.lTag) return this.$$.toast("No Tag Specified.")
                  this.link.tags.push(this.lTag)
                  this.lTag = '' },

      trash()   { 
        if (this.item == 'board') this.$store.commit('trash_board', this.board)
        else this.$store.commit('trash_link', { board: this.board, item: this.item })
        this.finish()
      },
      finish() { 
        if (this.lBoard > 0) {
          this.$store.commit('change_board', { 
            old: this.board, new: this.lBoard, item: this.item
          })
        }
        this.$store.commit('refresh')
        return this.$emit('finished') 
      }
    }
  }
</script>

<style scoped>
  input, select {
    margin-bottom: .5em;
  }
  .row {
    margin-bottom: 0;
  }
  .col {
    padding-top: 0;
    padding-bottom: 0;
  }
  .bottom {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
</style>