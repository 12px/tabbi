import Vue from 'vue'

let params = {
  apiKey: 'AIzaSyANEWNcTsXZau98evL6qnDc3IXOrJwEuPs',
  clientId: '645077009967-ttvthb5jpctk45q6524k87k5rm3n2r4p.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.appdata',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
}
let list = { 
  q: 'name="tabbi.json"',
  spaces: 'appDataFolder', 
  fields: 'nextPageToken, files(id, name)' 
}

const sync = {

  disable() {
    console.info("Disabling Sync.")
    return new Promise((resolve, reject) => {
      gapi.auth2.getAuthInstance().signOut().then(() => resolve())
    })
  },

  enable(state, commit) {
    console.info("Enabling Sync.")
    return new Promise((resolve, reject) => {
      let crx = chrome.identity
      Promise.all([ gapi.client.load('drive', 'v3' )]).then(() => {
        if (crx) {
          // we're in a chrome extension
          // which doesn't allow use of gapi client
          // have to use chrome identity 
          Promise.resolve(crx.getAuthToken({ 'interactive': true }, (token) => {
            Promise.all([
              gapi.client.init({ apiKey: params.apiKey }),
              gapi.client.setToken({ access_token: token })
            ]).then(() => {
              this.fetch(state).then((data) => resolve(data))
            })
          }))
        } else {
          // if no chrome.identity
          // assume we're in browser mode
          // with full API access
          gapi.client.init(params).then(() => {
            let auth = gapi.auth2.getAuthInstance()
            if (auth.isSignedIn.get()) {
              return this.fetch(state).then((data) => resolve(data))
            } else {
              // sign in with google if not authenticated
              return Promise.resolve(auth.signIn()).then(() => {
                this.fetch(state).then((data) => resolve(data))
              })
            }
          })
        }
      })
    })
  },

  fetch(state, commit) {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.list(list).then((data) => {
        if (!data.result.files.length) {
          console.info("No Sync Data Found, Creating...")
          this.create().then(() => { 
            this.save(state).then(() => resolve({ sync: true }))
          })
        } else {
          console.info("Syncing Data...")
          let fileId = data.result.files[0].id
          gapi.client.drive.files.get({ alt: 'media',  fileId }).then((file) => {
            return this.handle(state, commit, file).then((data) => resolve(data))
          })
        }
      })
    })
  },

  handle(state, commit, data) {
    return new Promise((resolve, reject) => {
      let loaded = JSON.parse(data.body)
      let cur = state.meta, got = loaded.meta
      // Local data is newer, save that
      if (cur.updatedAt > got.updatedAt || cur.ver != got.ver) {
        console.info("Syncing Local Data")
        return this.save(state).then(() => resolve({ sync: true }))
      }
      // Sync'd Data is newer, use that
      if (cur.createdAt > got.createdAt || cur.updatedAt < got.updatedAt) {
        console.info("Data Synced.")
        return resolve({ sync: true, state: loaded })
      }
      // Data is in sync
      if (cur.updatedAt == got.updatedAt) {
        console.info("Data In Sync.")
        return resolve({ sync: true })
      }
    })
  },

  create() {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.create({
        fields: 'id', resource: { name: 'tabbi.json', parents: ['appDataFolder'] }
      }).then((response) => resolve())
    })
  },

  save(data) {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.list(list).then((found) => {
        gapi.client.request({
          path: '/upload/drive/v3/files/' + found.result.files[0].id,
          method: 'PATCH',
          params: { uploadType: 'media' },
          body: JSON.stringify(data)
        }).then((result) => { 
          resolve(result) 
        })
      })
    })
  }

}

export default {
  sync: sync,
  install: function(Vue) {
    Vue.prototype.$sync = sync
  }
}