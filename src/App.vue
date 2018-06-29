<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
</script>

<style lang="scss">
  $input-hover-border-color: hsl(0, 0%, 86%);
  $input-focus-border-color: hsl(0, 0%, 86%);
  $input-focus-box-shadow-size: 0;
  
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

  .column.none {
    flex: none;
  }

  .opt {
    cursor: pointer;
  }

  .muted { color: $grey-light; }
  .barely { color: $grey-lighter; }
</style>