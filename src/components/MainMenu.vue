<template>
  <aside :class="['txt-c accent', menu.active ? 'active' : '']" @keyup.escape="close">
    
    <div class="abs" @click="close">
      <icon name="times" class="close"></icon>
    </div>

    <h6 class="logo">•pinnd•</h6>

    <button @click="newBoard">New Board</button>
    <button @click="newLink">New Link</button>

    <div class="spacer"></div>

    <button @click="changeLinks">Links: {{ view.links }}</button>
    <button @click="changeGrid">Grid: {{ view.grid }}</button>

    <button @click="changeTheme">
      Theme: <span class="txtt-c">{{ view.theme }}</span>
    </button>

    <div class="spacer"></div>

    <button @click="toggleSync">
      Sync: {{ $store.state.meta.syncData ? 'On' : 'Off' }}
    </button>

    <input id="import" type="file" @change="loaded">
    <label class="btn" for="import">Import</label>
  </aside>
</template>

<script>
  export default {
    props: ['view', 'menu', 'creator'],
    methods: {
      close()   { return this.menu.active = false },
      newLink() {
        this.creator.active = true
        this.creator.thing = 'link'
        this.menu.active = false
      },
      newBoard() {
        this.creator.active = true
        this.creator.thing = 'board'
        this.menu.active = false
      },
      changeLinks() {
        this.$store.commit('update_view', { 
          links: this.view.links == 5 ? 10: this.view.links == 10 ? 25 : 5 
        })
      },
      changeGrid() { 
        this.$store.commit('update_view', { grid: this.view.grid < 4 ? 1 : -3 })
      },
      changeTheme() {
        this.$store.commit('update_view', { 
          theme: this.view.theme == 'day' ? 'night' : 'day' 
        })
      },
      toggleSync() {
        if (!this.$store.state.meta.syncData) {
          this.$store.dispatch('enable_sync', this.$sync)
        } else {
          this.$store.dispatch('disable_sync', this.$sync)
        }
      },
      loaded(e) { this.close()
        return this.$store.dispatch('parse_bookmarks', e) 
      }
    }
  }
</script>

<style scoped>
  aside    { max-width: 200px; }
  a {
    border: none;
  }
  strong {
    margin-bottom: 1em;
  }
  .logo {
    margin: 0 0 1em 0;
  }
  .abs {
    top: 1em;
    right: 1em;
    cursor: pointer;
  }
  button, .btn {
    padding: 0;
    width: 100%;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: none;
  }
  .spacer {
    height: 1px;
    margin: 1em 0;
    background: #fff;
  }
</style>