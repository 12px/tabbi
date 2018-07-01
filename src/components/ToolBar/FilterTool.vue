<template>
  <b-input rounded placeholder="Type to filter/search" 
    @keyup.native="runFilter"></b-input>
</template>

<script>
  export default {
    methods: {
      runFilter(e) {
        // if (e.key == 'Enter') open Filtered
        if (e.key == 'Escape' || e.key == 'Enter') e.target.value = result.key = ''
        this.$store.commit('set_filter', e.target.value)
      }
    }
  }
</script>

<style></style>