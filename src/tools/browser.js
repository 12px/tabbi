export default {
  install: function(Vue) {
    Vue.prototype.$browser = function() {
      return new Promise((resolve, reject) => {
        if (chrome.tabs) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            resolve({ url: tabs[0].url, title: tabs[0].title });
          });
        } else {
          resolve({ title: '', url: '' })
        }
      })
    }
  }
}