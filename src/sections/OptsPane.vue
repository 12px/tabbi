<template>
  <div id="opts">
    <div class="card">
      <div class="title row">
        <div class="col col-xs-6 col-lg-2"><h3 class="card-title">Options</h3></div>
        <div class="col col-xs-6 col-lg-10 align-right">v{{ $root.version }}</div>
      </div>

      <div class="options row">
        <div class="col col-lg-3">
          <div class="form-control">
            <label>Visible Links</label>
            <select :value="view.links" @change="setLinks">
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>
        <div class="col col-lg-3">
          <input id="import" type="file" @change="getImport">
          <label for="import" class="button-primary">
            Import Bookmarks
          </label>
        </div>
        <div class="col col-lg-3">
          <button class="button-primary" @click="setSync()">
            Drive Sync: {{ synced ? 'On' : 'Off' }}
          </button>
        </div>
      </div>
      
      <button class="button-primary-outlined button-small" @click="close()">
        Dismiss
      </button>
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
      close()     { this.$store.commit('update_local', { config: false }) },
      setLinks(e) { this.$store.commit('update_view',  { links: e.target.value }) },
      setSync()   {
        this.$store.dispatch(this.synced ? 'disable_sync' : 'enable_sync', this.$sync)
      },
      async getImport(e) {
        let imported = await this.$importer(e.target.files[0])
        this.$store.commit('import_bookmarks', imported)
      },
    }
  }
</script>

<style scoped>
  #opts {
    padding-bottom: 15px;
  }
  #import {
    display: none;
  }
  .card {
    margin: 0;
  }
  .title {
    align-items: center;
  }
  .options {
    align-items: flex-end;
  }
  .row .col-lg-4 {
    padding-right: 20px;
  }
  .button-primary {
    width: 100%;
    margin: 0 0 11px;
    text-align: center;
  }
  label.button-primary {
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    cursor: pointer;
    padding: 0 20px;
    letter-spacing: 1px;
    border-radius: 3px;
    display: inline-block;
    text-transform: uppercase;
  }
</style>