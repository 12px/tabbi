<template>
  <div id="popup" class="accent card" v-if="extActive">

    <h3 class="card-title">Add Link</h3>

    <input type="text"
      v-focus
      :value="name"
      @keup.enter="finish()"
      placeholder="Link Name">

    <input type="text"
      :value="link"
      @keup.enter="finish()"
      placeholder="Link URL">

    <select v-model="lastBoard">
      <option v-for="(b, key) in $store.state.boards" :value="key">
        {{ b.name }}
      </option>
    </select>

    <input type="text"
      v-model="nTag"
      @keyup.enter="addTag()"
      placeholder="Add Tag">

    <ul class="tags">
      <li class="tag"
        v-for="(tag, i) in tags"
        @click="remTag(i)"
        :key="i">
        <strong>
          #{{ tag }}
        </strong>
      </li>
    </ul>

    <div class="bottom row align-center">
      <div class="col col-xs-6">
        <a href="#" @click="cancel()">
          <i class="fas fa-times"></i>
        </a>
      </div>
      <div class="col col-xs-6">
        <a href="#" @click="finish()">
          <i class="fas fa-check"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        link: '',
        tags: [],
        nTag: ''
      }
    },
    computed: {
      extActive() { return this.name && this.link },
      lastBoard() { return this.$store.state.meta.lastBoard }
    },
    methods: {
      remTag(i) { this.tags.splice(i, 1) },
      addTag()  {
        if (!this.nTag) return this.$$.toast("No Tag Specified.")
        this.tags.push(this.nTag)
        this.nTag = ''
      },
      finish()  { 
        this.$store.commit('create_link', { 
          name: this.name, link: this.link, tags: this.tags
        })
        this.cancel()
      },
      cancel() {
        this.name = ''
        this.link = ''
        this.tags = ''
      }
    },
    created() {
      this.$browser().then((data) => {
        this.name = data.title
        this.link = data.url
      })
    }
  }
</script>

<style scoped>
  input, select {
    margin-bottom: 10px;
  }
  i {
    font-size: 1.5em;
  }
</style>