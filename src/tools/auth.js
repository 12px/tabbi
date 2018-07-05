import Vue from 'vue'

let auth = new Vue({
  computed: {
    token: {
      get: function()  { return localStorage.getItem('id_token') },
      set: function(id) { localStorage.setItem('id_token', id) }
    },
    accessToken: {
      get: function()     { return localStorage.getItem('access_token') },
      set: function(access) { localStorage.setItem('access_token', access) }
    },
    expiresAt: {
      get: function() { return localStorage.getItem('expires_at') },
      set: function(when) {
        let expires = JSON.stringify(when * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expires)
      }
    },
    user: {
      get: function()     { return JSON.parse(localStorage.getItem('user')) },
      set: function(user) { localStorage.setItem('user', JSON.stringify(user)) }
    }
  },
  methods: {
    isAuth() { return new Date().getTime() < this.expiresAt },
    handleAuth(data) {
      let api = data.Zi, user = data.w3
      if (api && api.id_token && api.access_token) {
        this.token = api.id_token
        this.accessToken = api.access_token
        this.expiresAt = api.expires_at
        this.user = user
        setTimeout(() => window.location.reload(), 1000)
      }
    }
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth
  }
}