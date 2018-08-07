import Vue from 'vue'

let params = {
  apiKey: 'AIzaSyANEWNcTsXZau98evL6qnDc3IXOrJwEuPs',
  clientId: '645077009967-ttvthb5jpctk45q6524k87k5rm3n2r4p.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.appdata',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
}
let list = { 
  q: 'name="pinnd.json"',
  spaces: 'appDataFolder', 
  fields: 'nextPageToken, files(id, name)' 
}

const sync = {

  disable() {
    return new Promise((resolve, reject) => {
      gapi.auth2.getAuthInstance().signOut().then(() => { resolve() })
    })
  },

  enable(state) {
    return new Promise((resolve, reject) => {
      Promise.all([ gapi.client.load('drive', 'v3' )]).then(() => {
        gapi.client.init(params).then(() => {
          let auth = gapi.auth2.getAuthInstance()
          if (!auth.isSignedIn.get()) {
            return Promise.resolve(auth.signIn()).then(() => {
              this.fetch(state).then(state).then((on) => { resolve(on) })
            })
          } else return this.fetch(state).then(state).then((on) => { resolve(on) })
        })
      })
    })
  },

  fetch(state) {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.list(list).then((data) => {
        if (!data.result.files.length) {
          console.info("No Sync Data Found.")
          this.create().then(() => { 
            this.save(state).then(() => { resolve(true) })
          })
        } else {
          console.info("Syncing Data...")
          this.load(data.result.files[0].id).then((file) => {
            let loaded = JSON.parse(file.body)
            // commit('load_data', loaded)
            console.info("Data Synced.")
            resolve(true)
          })
        }
      })
    })
  },

  load(id) {
    return new Promise((resolve, reject) => {
      let by = { alt: 'media', fileId: id }
      gapi.client.drive.files.get(by).then((data) => { resolve(data) })
    })
  },

  create() {
    console.info("Creating Data...")
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.create({
        fields: 'id', resource: { name: 'pinnd.json', parents: ['appDataFolder'] }
      }).then((response) => { resolve(response.result.id) })
    })
  },

  save(data) {
    console.info("Saving Data...")
    return new Promise((resolve, reject) => {
      this.findData().then((found) => {
        gapi.client.request({
          path: '/upload/drive/v3/files/' + found.result.files[0].id,
          method: 'PATCH',
          params: { uploadType: 'media' },
          body: JSON.stringify(data)
        }).then((result) => { 
          console.info("Saved Data")
          resolve(result) 
        })
      })
    })
  }

}

export default {
  install: function(Vue) {
    Vue.prototype.$sync = sync
  }
}