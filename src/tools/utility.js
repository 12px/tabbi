let pd = {
  // find obj in array by id
  xById(arr, id) { return arr.findIndex((i) => i.id == id) },

  // filter
  compare(a, b) {
    if (!b) return true;
    let newA = a.toLowerCase();
    if (b.constructor === Array) {
      if (!b.length) return true;
      for (var i = b.length - 1; i >= 0; i--) {
        let newB = b[i].toLowerCase();
        if (newB.indexOf(newA) > -1) return false;
      }
      return true;
    } else {
      let newB = b.toLowerCase();
      return newB.indexOf(newA) < 0;
    }
  },

  find(thing, arr) {
    let result = [];
    for (var l = arr.length - 1; l >= 0; l--) {
      let link = arr[l];
      if (thing == 'str') result.push(link.title);
      else if (link.tags && link.tags.length) {
        for (var t = link.tags.length - 1; t >= 0; t--) {
          result.push(link.tags[t]);
        }
      }
    }
    return result;
  },

  filtered(filter, name, arr, board) {
    let pool = [];
    if (!filter.active) return false;
    if (filter.by == 'tag' && !board) pool = arr;
    if (filter.by == 'string' && !board) pool = name;
    if (filter.by == 'board' && !board) return false;
    if (filter.by == 'board' && board) pool = name;
    if (filter.by == 'tag' && board) pool = this.find('tags', arr);
    if (filter.by == 'string' && board) pool = this.find('str', arr);
    return this.compare(filter.key, pool);
  }
}

export default {
  install: function(Vue) {
    Vue.prototype.$pd = pd

    // autofocus
    Vue.directive('focus', { inserted: function (el) { el.focus() } })
  }
}