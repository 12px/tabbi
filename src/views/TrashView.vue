<template>
  <div>

    <trash-bin :class="column" :self="trash" :id="'links'"></trash-bin>

    <trash-bin :class="column" 
      v-for="(bin, key) in trash.boards"
      :self="bin" :id="key" :key="key">
    </trash-bin>

  </div>
</template>

<script>
  import TrashBin  from '../components/TrashBin.vue'

  export default {
    computed: {
      view()      { return this.$store.state.view },
      trash()    { return this.$store.state.trash },
      column() {
        let c = this.view.grid
        let width = c > 3 ? 'w-25' : c > 2 ? 'w-33' : c > 1 ? 'w-50' : 'w-100'
        return `col m-0 ${width}`
      }
    },
    methods: {
      showCreator() { this.create.active = true }
    },
    components: {
      TrashBin
    }
  }
</script>

<style scoped>
</style>