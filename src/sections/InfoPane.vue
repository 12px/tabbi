<template>
  <div id="info">
    <div class="card">
      <div class="logo row">
        <div class="col col-lg-1">
          <h4>pinnd</h4>
        </div>
        <div class="col col-lg-11">
          <h6>your (new) new tab</h6>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-4">
          <h6>Bookmark Focused</h6>
          <p><strong>pinnd</strong> puts all the links you save front and center, so you never have to dig for them. The filter bar it makes it find whichever link you're looking for, and quickly. Search by board, title, or tag!</p>
          <p>Using an extension, you can even save whole sessions of links!</p>
        </div>
        <div class="col col-lg-4">
          <h6>Use Anywhere</h6>
          <p>pinnd is available as a static website and a browser extension. Since you can sync your data with google drive, you can use it anywhere.</p>
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
    methods: {
      close() {
        this.$store.commit('update_view', { splash: false })
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
</style>