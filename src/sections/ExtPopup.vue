<template>
  <div class="row" v-if="isBrowser">

    <div class="col col-md-6 col-lg-4 col-xlg-2-5">
      
      <div class="input-box" v-if="session">
        <input disabled type="text" 
          v-for="tab in tabs" :value="tab.name">

        <input v-focus type="text" :value="label"
          @keup.enter="saveSession()" placeholder="Session Name">

        <button class="full button-primary" @click="saveSession()">
          Save Session
        </button>
      </div>

      <button v-if="!session"
        class="full button-primary-outlined" 
        @click="session = true">
        Save Session ({{ tabs.length }})
      </button>

      <div class="input-box" v-if="!session">
        <input v-focus type="text" :value="name"
          @keup.enter="saveLink()" placeholder="Link Name">

        <select v-model="lastBoard">
          <option v-for="(b, key) in $store.state.boards" :value="key">
            {{ b.name }}
          </option>
        </select>

        <button class="full button-primary" @click="saveLink()">
          Save Link
        </button>
      </div>

      <button v-if="session"
        class="full button-primary-outlined" 
        @click="session = false">
        Save Link
      </button>
    </div>
      
  </div>
</template>

<script>
  export default {
    data() { 
      return { 
        name: '', link: '', tabs: [], session: false,
        label: 'Session On ' +  new Date().toLocaleDateString('en-US')
      }
    },
    computed: {
      isBrowser() { return this.name && this.link },
      lastBoard() { return this.$store.state.meta.lastBoard }
    },
    methods: {
      saveLink()  { 
        this.$store.commit('create_link', { name: this.name, link: this.link })
        this.cancel()
      },
      saveSession() {
        let session = { name: this.sesh.name, links: this.tabs }
        this.$store.commit('create_session', session)
        this.cancel()
      },
      cancel() {
        this.name = ''
        this.link = ''
        this.tabs = []
      }
    },
    created() {
      this.$browser().then((data) => {
        if (data) {
          for (var i = 0; i < data.length; i++) {
            this.tabs.push({ name: data[i].title, link: data[i].url })
            if (data[i].active) {
              this.name = data[i].title
              this.link = data[i].url
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