<template>
  <nav class="container">
    <div class="filter-bar columns">
      <div class="column logo is-hidden-mobile">
        <strong class="has-text-primary">•pinnd•</strong>
      </div>
      <div class="column">
        <filter-tool></filter-tool>
      </div>
    </div>
    <div class="tool-bar columns">
      <div class="column is-hidden-mobile">
        <create-tool></create-tool>
      </div>
      <div class="column is-hidden-mobile"></div>
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
  .logo {
    flex: none;
    padding-top: 1.07em;
  }
</style>