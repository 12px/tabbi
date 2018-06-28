<template>
  <div id="home">

    <tool-bar></tool-bar>
    <pin-board></pin-board>

  </div>
</template>

<script>
  import ToolBar from '../components/ToolBar.vue'
  import PinBoard from '../components/PinBoard.vue'

  export default {
    components: { ToolBar, PinBoard }
  }
</script>

<style></style>