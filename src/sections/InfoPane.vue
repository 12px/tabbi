<template>
  <div id="info">
    <div class="card">
      <div class="logo row">
        <div class="col col-lg-1">
          <h4>Newtt</h4>
        </div>
        <div class="col col-lg-11">
          <h6>your (new) new tab</h6>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-4">
          <h6>Bookmark Focused</h6>
          <p><strong>Newtt</strong> puts all the links you save front and center, so you never have to dig for them. The filter bar it makes it find whichever link you're looking for, and quickly.</p>
          <p>Using an extension, you can even save whole sessions of links!</p>
        </div>
        <div class="col col-lg-4">
          <h6>Use Anywhere</h6>
          <p>Newtt is available as a static website and a browser extension. Since you can sync your data with google drive, you can use it anywhere.</p>
          <p>Use a browser extension on your desktop, and set it as your home page on mobile.</p>
        </div>
        <div class="col col-lg-4">
          <h6>Features</h6>
          <p>
            Filtering by Title, Tag or Board. <br>
            <strong>:key</strong> filters boards - 
            <strong>#key</strong> filters tags <br>
            <em>Hit 'Enter' to open all visible links you've filtered</em>
          </p>
          <p><strong>Session Saving</strong> will save all of your open tabs into a new session, for re-opening later. (Extension Required)</p>
        </div>
      </div>
      <div class="row bottom">
        <div class="col col-lg-4">
          <h6>Already Have Bookmarks?</h6>
          <label>Import them here to get started!</label>
          <p class="align-center">
            <input id="import" type="file" @change="getImport">
            <label for="import" class="full button button-primary">
              Import Bookmarks (*.html)
            </label>
          </p>
        </div>
        <div class="col col-lg-4">
          <h6>Options</h6>
          <div class="form-control">
            <label>Collapse After</label>
            <select :value="view.links" @change="setLinks">
              <option value="3">3 Links</option>
              <option value="5">5 Links</option>
              <option value="10">10 Links</option>
              <option value="25">25 Links</option>
            </select>
          </div>
        </div>
        <div class="col col-lg-4">
          <h6>Backup</h6>
          <div class="form-control">
            <label>Sync With Google Drive</label>
            <button class="full button-primary" @click="setSync()">
              Drive Sync: {{ synced ? 'On' : 'Off' }}
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col align-center">
          <button class="button-primary-outlined button-small" @click="close()">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      view()   { return this.$store.state.view },
      synced() { return this.$store.state.meta.syncData },
    },
    methods: {
      close() { this.$store.commit('update_view', { config: false }) },
      setLinks(e) { this.$store.commit('update_view',  { links: e.target.value }) },
      setSync()   {
        this.$store.dispatch(this.synced ? 'disable_sync' : 'enable_sync', this.$sync)
      },
      async getImport(e) {
        let imported = await this.$importer(e.target.files[0])
        this.$store.commit('import_bookmarks', imported)
      }
    }
  }
</script>

<style scoped>
  #info {
    padding-bottom: 15px;
  }
  .logo {
    align-items: center;
  }
  .card {
    margin: 0;
  }
  .row .col-lg-4 {
    padding-right: 20px;
  }
  input[type=file] {
    display: none;
  }
  .full {
    width: 100%;
    display: block;
  }
</style>