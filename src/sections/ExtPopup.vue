<template>
  <div id="popup">
    <div class="row">

      <div class="col col-md-6 col-lg-4 col-xlg-2-5">
        
        <div class="input-box" v-if="session && hasTabs">
          <input disabled type="text" 
            v-for="tab in tabs" v-model="tab.name">

          <input v-focus type="text" v-model="label"
            @keup.enter="saveSession()" placeholder="Session Name">

          <button class="full button-primary" @click="saveSession()">
            Save Session
          </button>
        </div>

        <button v-if="!session && hasTabs"
          class="full button-primary-outlined" 
          @click="session = true">
          Save Session ({{ tabs.length }})
        </button>

        <div class="input-box" v-if="!session && hasLink">
          <input v-focus type="text"v-model="name"
            @keup.enter="saveLink()" placeholder="Link Name">

          <select v-model="board">
            <option v-for="(b, key) in $store.state.boards" :value="key">
              {{ b.name }}
            </option>
          </select>

          <input type="text"
            v-model="nTag"
            @keyup.enter="addTag()"
            placeholder="Add Tag">

          <button class="full button-primary" @click="saveLink()">
            Save Link
          </button>
        </div>        

        <ul class="tags" v-if="!session && hasLink">
          <li class="tag"
            v-for="(tag, i) in tags"
            @click="remTag(i)"
            :key="i">
            <strong>
              #{{ tag }}
            </strong>
          </li>
        </ul>

        <button v-if="session && hasLink"
          class="full button-primary-outlined" 
          @click="session = false">
          Save Link
        </button>
      </div>
        
    </div>
  </div>
</template>

<script>
  export default {
    data() { 
      return { 
        board: this.$store.state.meta.lastBoard,
        name: '', link: '', tabs: [], session: false, tags: [], nTag: '',
        label: 'Session On ' +  new Date().toLocaleDateString('en-US')
      }
    },
    computed: {
      hasTabs()   { return this.tabs.length > 1 },
      hasLink()   { return this.name && this.link },
      isBrowser() { return (this.hasLink || this.hasTabs) && this.$root.popup }
    },
    methods: {
      addTag() {
        if (!this.nTag) return this.$$.toast("No Tag Specified.")
        this.tags.push(this.nTag)
        this.nTag = ''
      },
      remTag(i) { this.tags.splice(i, 1) },

      saveLink()  { 
        this.$store.commit('create_link', { 
          board: this.board, name: this.name, link: this.link, tags: this.tags
        })
        this.cancel()
      },
      saveSession() {
        this.$store.commit('create_session', {
          name: this.label, links: this.tabs
        })
        this.cancel()
      },
      cancel() {
        this.name = ''
        this.link = ''
        this.nTag = ''
        this.tabs = []
        this.tags = []
      }
    },
    created() {
      this.$browser().then((data) => {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].url != 'chrome://newtab/') {
              this.tabs.push({ name: data[i].title, link: data[i].url })
              if (data[i].active) {
                this.name = data[i].title
                this.link = data[i].url
              }
            }
          }
        }
      })
    }
  }
</script>

<style scoped>
  i {
    font-size: 1.25em;
  }
  .card {
    padding: 20px 30px;
  }
  .row {
    margin: 0;
  }
  .row .col {
    padding: 0;
  }
</style>