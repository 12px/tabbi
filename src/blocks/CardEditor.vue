<template>
  <div class="editor" @keyup.escape="finish()">

    <div v-if="!link">
      <input type="text"
        v-focus
        v-model="self.name"
        @keup.enter="finish()"
        placeholder="Board Name">
    </div>

    <div class="link" v-if="link">
      <input type="text"
        v-focus
        v-model="link.name"
        @keup.enter="finish()"
        placeholder="Link Name">

      <input type="text"
        v-model="link.link"
        @keup.enter="finish()"
        placeholder="Link URL">

      <select v-model="newBoard">
        <option value="0" selected>Change Board</option>
        <option v-for="(b, key) in $store.state.boards"
          v-if="self.id != b.id" :value="key">
          {{ b.name }}
        </option>
      </select>

      <input type="text"
        v-model="newTag"
        @keyup.enter="addTag()"
        placeholder="Add Tag">

      <ul class="tags">
        <li class="tag"
          v-for="(tag, i) in link.tags"
          @click="remTag(i)"
          :key="i">
          <strong>
            #{{ tag }}
          </strong>
        </li>
      </ul>
    </div>

    <div class="bottom row align-center">
      <div class="col col-xs-4">
        <a href="#" @click="finish()">
          <i class="mute fas fa-times"></i>
        </a>
      </div>
      <div class="col col-xs-4">
        <a href="#" @click="trash()">
          <i class="bad fas fa-trash-alt"></i>
        </a>
      </div>
      <div class="col col-xs-4">
        <a href="#" @click="finish()">
          <i class="good fas fa-check"></i>
        </a>
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
  .link input[type="text"],
  .link select {
    margin-bottom: 10px;
  }
</style>