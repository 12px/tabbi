export default {
  install: function(Vue) {
    Vue.prototype.$browser = function() {
      return new Promise((resolve, reject) => {
        if (chrome.tabs) {
          chrome.tabs.query({}, (tabs) => resolve(tabs))
        } else {
          resolve(false)
        }
      })
    }
  }
}