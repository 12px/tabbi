<template>
  <div id="info">
    <div class="card">
      <div class="logo row">
        <div class="col">
          <h3>Tabbi</h3>
          <h6>your (new) new tab page</h6>
          <h5 class="float-right">
            <a href="#" @click="close()"><i class="fas fa-times"></i></a>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-4">
          <h6>Already Have Bookmarks?</h6>
          <p>You can export them to an HTML file, and then import them here.</p>
          <input type="file" id="import" @change="getImport">
          <label for="import" class="align-center full button button-primary">
            Import Bookmarks (*.html)
          </label>
        </div>
        <div class="col col-lg-4">
          <h6>Keep Data In Sync</h6>
          <p>Tabbi can sync with your Google Drive account so you don't lose data.</p>
          <button class="full button-primary" @click="setSync()">
            Drive Sync: {{ synced ? 'On' : 'Off' }}
            <i class="fas fa-exclamation-circle" v-if="!synced"></i>
          </button>
        </div>
        <div class="col col-lg-4">
          <h6>Tabbi Options</h6>
          <p><strong>Visible Links</strong> how many links shown per card before collapsing</p>
          <select :value="view.links" @change="setLinks">
            <option value="3">3 Links</option>
            <option value="5">5 Links</option>
            <option value="10">10 Links</option>
            <option value="25">25 Links</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col align-right">
          <small class="float-left">
            Use Reddit or Github to request features and report bugs.
          </small>
          <a @click="about = true"
            href="#" class="button button-primary-outlined button-small">
            About
          </a>
          <a href="https://github.com/12px/tabbi" 
            target="_blank" class="button button-primary-outlined button-small">
            On Github
          </a>
          <a href="https://reddit.com/r/tabbi" 
            target="_blank" class="button button-primary-outlined button-small">
            On Reddit
          </a>
          <a href="https://chrome.google.com/webstore/detail/ilonjmcjjkcnhndjfkaoekocdfhedlfd"
            target="_blank" class="button button-primary button-small">
            For Chrome
          </a>
        </div>
      </div>
    </div>
    <div class="modal-mask" v-if="about">
      <div class="modal">
        <div class="modal-head">
          <strong class="modal-title">About Tabbi</strong>
        </div>
        <div class="modal-body">
          <div class="accordian">
            <h5 @click="accord = 1"><i class="fas fa-plus"></i> Bookmark Focused</h5>
            <div v-if="accord == 1">
              <p><strong>Tabbi</strong> puts all the links you save front and center, so you never have to dig for them. The filter bar it makes it find whichever link you're looking for, and quickly.</p>
              <p>Using an extension, you can even save whole sessions of links!</p>
            </div>

            <h5 @click="accord = 2"><i class="fas fa-plus"></i> Use Anywhere</h5>
            <div v-if="accord == 2">
              <p>Tabbi is available as a static website and a browser extension. Since you can sync your data with google drive, you can use it anywhere.</p>
              <p>Use a browser extension on your desktop, and set it as your home page on mobile.</p>
            </div>

            <h5 @click="accord = 3"><i class="fas fa-plus"></i> Features</h5>
            <div v-if="accord == 3">
              <p>
                Filtering by Title, Tag or Board. <br>
                <strong>:key</strong> filters boards - 
                <strong>#key</strong> filters tags <br>
                <em>Hit 'Enter' to open all visible links you've filtered</em>
              </p>
              <p><strong>Session Saving</strong> will save all of your open tabs into a new session, for re-opening later. (Extension Required)</p>
            </div>
          </div>
        </div>
        <div class="modal-footer align-right">
          <small>v{{ $root.version }}</small>
          <button class="button-primary" @click="about = false">Close</button>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() { return { accord: 1, about: false } },
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
  .logo .col * {
    display: inline-block;
    vertical-align: middle;
  }
  .logo h3 {
    margin-right: 0.5em;
  }
  .logo h6 {
    margin-top: 1px;;
  }
  .accordian h5 {
    cursor: pointer;
    padding-bottom: 5px;
  }
  .accordian .fa-plus {
    font-size: 0.5em;
    margin-top: -5px;
    display: inline-block;
    vertical-align: middle;
  }
  .card {
    margin: 0;
  }
  select, .button.full {
    margin-bottom: 0;
  }
  .row .col-lg-4 {
    padding-right: 20px;
  }
  input[type=file] {
    display: none;
  }
  small {
    margin: 0 10px;
  }
</style>