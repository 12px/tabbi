<template>
  <div class="callback">CALLBACK</div>
</template>

<script>
  export default {
    name: 'callback',
    mounted() {
      console.log('hiya')
      this.$auth.handleAuth().then((data) => {
        this.$router.push({ name: 'home' })
      })
    }
  }
</script>

<style></style>