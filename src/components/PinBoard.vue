<template>
  <div class="container">
    
    <div class="columns is-multiline" v-if="!view.trash">
      
    </div>

    <div class="columns is-multiline" v-if="view.trash">
      
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      view()   { return this.$store.state.view },
      trash()  { return this.$store.state.trash },
      boards() { return this.$store.state.boards },
      cols() {
        let result = ['column', 'is-clipped']
        if (this.view.cols == 1) result.push('is-12')
        if (this.view.cols == 2) result.push('is-half')
        if (this.view.cols == 3) result.push('is-one-third')
        if (this.view.cols == 4) result.push('is-one-quarter')
        return result.join(' ')
      }
    }
  }
</script>

<style lang="scss">
</style>