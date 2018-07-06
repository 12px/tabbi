import Vue from 'vue'

let params = {
  apiKey: 'AIzaSyANEWNcTsXZau98evL6qnDc3IXOrJwEuPs',
  clientId: '645077009967-ttvthb5jpctk45q6524k87k5rm3n2r4p.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.appdata'
}
let list = { 
  q: 'name="db.json"',
  spaces: 'appDataFolder', 
  fields: 'nextPageToken, files(id, name)' 
}

const goog = {

  loadAPIs() {
    return new Promise((resolve, reject) => {
      Promise.all([ gapi.client.load('drive', 'v3') ]).then(() => { resolve() })
    })
  },

  initialize() {
    return new Promise((resolve, reject) => {
      gapi.client.init(params).then(() => { resolve() })
    })
  },

  findData() {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.list(list).then((data) => { resolve(data) })
    })
  },

  loadData(id) {
    return new Promise((resolve, reject) => {
      let by = { alt: 'media', fileId: id }
      gapi.client.drive.files.get(by).then((data) => { resolve(data) })
    })
  },

  createData() {
    return new Promise((resolve, reject) => {
      gapi.client.drive.files.create({
        fields: 'id', resource: { name: 'db.json', parents: ['appDataFolder'] }
      }).then((response) => { resolve(response.result.id) })
    })
  },

  saveData(data) {
    return new Promise((resolve, reject) => {
      this.findData().then((found) => {
        gapi.client.request({
          path: '/upload/drive/v3/files/' + found.result.files[0].id,
          method: 'PATCH',
          params: { uploadType: 'media' },
          body: JSON.stringify(data)
        }).then((result) => { resolve(result) })
      })
    })
  }

}

export default {
  install: function(Vue) {
    Vue.prototype.$goog = goog
  }
}