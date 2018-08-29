<template>
  <div class="splash-view accent">
    <div class="wrap">

      <div class="row ctr">
        <div class="col none">
          <h1 class="m-0">pinnd</h1>
        </div>
        <div class="col">
          <h5 class="m-0">your (new) new tab</h5>
        </div>
      </div>

      <div class="row">
        <div class="col m-0">
          <div class="card">
            <div class="header">
              <h6>Bookmark Focused</h6>
            </div>
            <p>
              <strong>Pinnd</strong> puts all the links you save front and center, so you never have to dig for them. The filter bar makes it easy to find whichever link you're looking for, and fast. Search by board, title or tag!
            </p>
            <p>Using an extension, you can even save whole sessions of links!</p>
          </div>
        </div>
        <div class="col m-0">
          <div class="card">
            <div class="header">
              <h6>Use Anywhere</h6>
            </div>
            <p>
              Pinnd is availabe as a static website and a browser extension. Since it can sync data with your google drive, you can use it anywhere.
            </p>
            <p>Use a browser extension on your desktop, and set it as your home page on mobile.</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="header">
          <h6>Features</h6>
        </div>
        <div class="row">
          <div class="col">
            <ul>
              <li>
                <strong>Bookmark Sorting</strong> into boards and tags.
              </li>
              <li>
                <strong>Filtering</strong> by Title, Tag, or Board. <br>
                Hit 'Enter' to open all visible links you've filtered.
              </li>
            </ul>
          </div>
          <div class="col">
            <ul>
              <li>
                <strong>Session Saving</strong> will save all of your open tabs into a new session board, for re-visiting later. <br>
                (Extension Required)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="ctr row m-t">
        <div class="col">
          <a href="https://github.com/12px/pinnd" class="btn otln">Github</a>
          <a href="#" class="btn otln">Chrome</a>
        </div>
        <div class="col none">
          <button @click="$store.commit('update_view', { info: false })">
            Get Started
          </button>  
        </div>
      </div>

      <div class="footer">
        pinnd version {{ $root.version }} - 
        built by <a href="https://12px.io" target="_blank">12px</a>
      </div>
      

    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .wrap {
    width: 100%;
    max-width: 800px;
  }
  .accent {
    opacity: 0.95;
    padding-top: 2em;
    min-height: 100vh;
  }
  .subtitle {
    margin-bottom: 2em;
  }
  h6 {
    margin: 0;
  }
  .footer,
  .buttons {
    margin-top: 2em;
    text-align: center;
  }
  .footer {
    font-size: 0.75em;
  }
  .btn, button {
    font-weight: 700;
    padding: 0 2rem;
    margin: 0;
  }
  .btn {
    margin-right: 5px;
    font-size: 1rem;
  }
  button {
  }
</style>