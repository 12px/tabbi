<template>
  <div class="login container">
    <div class="box">
      <strong>pinnd</strong> stores your user data in your Google Drive. In order to do this, you need to sign in via google first.

      <div class="has-text-centered">
        <button ref="signin" class="button is-primary">Sign In With Google</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      if (!window.gapi) return console.log("No API?")
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({ client_id: "645077009967-ttvthb5jpctk45q6524k87k5rm3n2r4p.apps.googleusercontent.com" })

        auth2.attachClickHandler(this.$refs.signin, {}, 
          user => { this.success(user) }, error => { this.error(error) })
      })
    },
    methods: {
      success(e) { this.$auth.handleAuth(e) },
      error(e) { this.$toast.open(this.$$.toast(e.error)) }
    }
  }
</script>

<style>
  .login .box {
    max-width: 300px;
  }
  .login .button {
    margin-top: 1rem;
  }
</style>