<template>
  <div id="app">
    <!-- views/Home.vue -> comp/AppHome.vue -->
    <router-view />
  </div>
</template>

<style lang="scss">
  $input-hover-border-color: hsl(0, 0%, 86%);
  $input-focus-border-color: hsl(0, 0%, 86%);
  $input-focus-box-shadow-size: 0;
  
  @import '~bulma/bulma.sass';
  @import '~buefy/src/scss/buefy';

  body {
    min-width: 300px;
    min-height: 600px;
  }

  #app {
    width: 100%;
    height: 100vh;
    overflow: auto;
    position: fixed;
  }

  .container { padding: 1rem }
  .column.none { flex: none; }
  .opt { cursor: pointer; }
  .grab { cursor: move; }
  .muted { color: $grey-light; }
  .barely { color: $grey-lighter; }
  .is-primary-border { border: 1px solid $primary; }

  @media screen and (max-width: 768px) {
    .is-clipped-mobile {
      overflow: hidden !important;
    }
  }
</style>