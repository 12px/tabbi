<template>
  <nav class="container">
    <div class="columns">
      <div class="column logo is-hidden-mobile">
        <strong class="has-text-primary">•pinnd•</strong>
      </div>
      <div class="column">
        <filter-tool></filter-tool>
      </div>
    </div>
    <div class="toolbar columns is-hidden-mobile">
      <div class="column">
        <create-tool></create-tool>
      </div>
      <div class="column"></div>
      <div class="column">
        <toggle-tool></toggle-tool>
      </div>
    </div>
  </nav>
</template>

<script>
  import FilterTool from './ToolBar/FilterTool.vue'
  import CreateTool from './ToolBar/CreateTool.vue'
  import ToggleTool from './ToolBar/ToggleTool.vue'

  export default {
    components: {
      FilterTool, CreateTool, ToggleTool
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/_all.sass';

  .logo {
    flex: none;
    padding-top: 1.07em;
  }

  .toolbar .column {
    padding-top: 0;
  }

  .toolbar,
  .toolbar .button {
    font-weight: bold;
    color: $grey-light;
  }
</style>