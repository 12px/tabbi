<template>
  <div class="callback"></div>
</template>

<script>
  export default {
    name: 'callback',
    mounted() {
      this.$auth.handleAuth().then((data) => {
        this.$router.push({ name: 'home' })
      })
    }
  }
</script>

<style></style>