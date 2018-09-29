<template>
  <div id="popup" class="accent card" v-if="active">

  </div>
</template>

<script>
  export default {
    computed: {
      active() { return false }
    }
  }
</script>

<style scoped>
</style>