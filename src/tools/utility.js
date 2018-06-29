let pd = {
  xById(arr, id) { return arr.findIndex((i) => i.id == id) }
}

export default {
  install: function(Vue) {
    Vue.prototype.$pd = pd
  }
}