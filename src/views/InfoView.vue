<template>
  <div class="info-view ctr row sm">

    <div class="col none opts">
      <div class="card">
        <div class="header">
          <h6 class="mute m-0">Options</h6>
        </div>

        <div class="option">
          <strong>Columns:</strong>
          <select :value="view.grid" @change="setGrid">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div class="option">
          <strong>Links:</strong>
          <select :value="view.links" @change="setLinks">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>

        <div class="option">
          <input id="import" type="file" @change="getImport">
          <label class="btn" for="import" alt="Import Bookmarks">
            <icon name="upload"></icon> Import Bookmarks
          </label>
          <div class="txt-c">
            Upload a .html 
          </div>
        </div>

        <div class="option">
          <button @click="setSync">
            <icon :name="badge" scale="0.9"></icon>
            Google Sync: {{ synced ? 'On' : 'Off'}}
          </button>
        </div>

        <div class="txt-c">
          <small>Your data isn't backed up! Turn on Sync to save your data in your Google Drive!</small>
      </div>

      </div>
    </div>

    <div class="col about">
      <h5 class="main m-0">hello world.</h5>

      <p>Welcome to <strong class="main">pnnd</strong>, a new tab replacement.</p>

      <p>
        <strong>Heavily focused on bookmarks,</strong> <em>pnnd</em> puts all the links you save front and center. The filter bar makes it easy to find whichever link you're looking for, and fast. Search by board, title or tag!
      </p>

      <p>
        <strong>Sessions take it to the next level</strong> - using the chrome extension, you can save all of your tabs at once into a new board, called a "session". You can easily re-open all of theses tabs at a later date, carrying on where you left off! Need to leave in the middle of research? Save your tabs as a session, and come back to them later. 
      </p>

      <a class="btn otln" href="https://github.com/12px/pinnd">View On Github</a>
      <a class="btn otln" href="https://github.com/12px/pinnd">Chrome Extension</a>

      <a class="nice close" href="#" @click="close">Close</a>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      view()   { return this.$store.state.view },
      synced() { return this.$store.state.meta.syncData },
      badge()  { return this.synced ? 'sync-alt' : 'exclamation-circle' }
    },
    methods: {
      close()      { this.view.info = false },
      getImport(e) { this.$store.dispatch('parse_bookmarks', e) },

      setGrid(e)   { this.$store.commit('update_view', { grid:  e.target.value }) },
      setLinks(e)  { this.$store.commit('update_view', { links: e.target.value }) },

      setSync()    { let action = this.synced ? 'disable_sync' : 'enable_sync'
                     this.$store.dispatch(action, this.$sync)
      }
    }
  }
</script>

<style scoped>
  h6 {
    font-weight: 400;
  }
  .info-view { 
    margin: 2em 0 5em; 
  }
  .opts {
    width: 100%;
    max-width: 300px;
  }
  .option {
    margin-bottom: 1em;
  }
  .option .btn, 
  .option button {
    margin: 0;
    width: 100%;
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: capitalize;
  }
  .about .btn {
    font-size: 1rem;
    font-weight: 700;
    padding: 0 2rem;
    margin-right: 1em;
  }
  .fa-icon {
    margin-top: 4px;
    margin-right: .5em;
    vertical-align: top;
  }
  .btn .fa-icon {
    margin-top: 8px;
  }
  .close {
    border: none;
  }
</style>