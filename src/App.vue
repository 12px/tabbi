<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
</script>

<style lang="scss">
  @import '~bulma/bulma.sass';

  body {
    min-width: 300px;
    min-height: 600px;
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow: auto;
  }

  .container {
    padding: 1rem
  }

  .muted { color: $grey-light; }
  .barely { color: $grey-lighter; }
</style>