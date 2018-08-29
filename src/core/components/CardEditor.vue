<template>
  <div class="editor"
    @keyup.escape="finish">
    
    <div v-if="!link">
      <input type="text"
        v-focus
        v-model="self.name"
        @keyup.enter="finish"
        placeholder="Board Name">
    </div>

    <div v-if="link">
      <input type="text"
        v-focus
        v-model="link.name"
        @keyup.enter="finish"
        placeholder="Link Name">

      <input type="text"
        v-model="link.link"
        @keyup.enter="finish"
        placeholder="Link URL">

      <select v-model="newBoard">
        <option value="0" selected>Change Board</option>
        <option 
          v-for="(b, key) in $store.state.boards"
          v-if="self.id != b.id"
          :value="key">
          {{ b.name }}
        </option>
      </select>

      <input type="text"
        v-model="newTag"
        @keyup.enter="addTag"
        placeholder="Add Tag">

      <div class="tags">
        <code class="tag"
          v-for="(tag, i) in link.tags"
          :key="i">
          <strong>#{{ tag }}</strong>
        </code>
      </div>
    </div>

    <div class="bottom row txt-c">
      <div class="col">
        <span class="mute opt" v-if="!none" @click="finish">
          <icon name="times"></icon>
        </span>
      </div>
      <div class="col">
        <span class="bad opt" @click="trash">
          <icon name="trash-alt"></icon>
        </span>
      </div>
      <div class="col">
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
    data() { return { newTag: '', newBoard: 0 } },
    computed: {
      self() { return this.$store.state.boards[this.board] },
      link() { return this.self.links[this.item] },
      none() { return this.link ? this.link.name == '' : !this.self.links.length }
    },
    methods: {
      addTag() {
        if (!this.newTag) return this.$$.toast("No Tag Specified.")
        this.link.tags.push(this.newTag)
        this.newTag = ''
      },
      remTag(i) { this.link.tags.splice(i, 1) },

      trash() {
        if (!this.link) this.$store.commit('trash_board', this.board)
        else this.$store.commit('trash_link', { board: this.board, item: this.item })
        this.finish()
      },

      finish() {
        let change = { old: this.board, new: this.newBoard, item: this.item }
        if (this.newBoard > 0) this.$store.commit('change_board', change)
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
  .bottom {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
</style>