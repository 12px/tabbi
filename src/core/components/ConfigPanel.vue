<template>
  <div class="card config">
    <div class="header">
      <h6 class="mute m-0">Options</h6>
    </div>

    <div class="option">
      <strong>Grid Columns:</strong>
      <select :value="view.grid" @change="setGrid">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>

    <div class="option">
      <strong>Hide Links After:</strong>
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
        <small>
          Upload a bookmarks file (html).
        </small>
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
  .config {
    width: 100%;
    max-width: 250px;
    position: absolute;
    bottom: 25px;
    left: 75px;
    z-index: 30;
    box-shadow: 0px 1px 10px 2px #4a95d9;
  }
  h6 {
    font-weight: 400;
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