let pd_util = {
  // find obj in array by id
  xById(arr, id) { return arr.findIndex((i) => i.id == id) },

  // draggable config
  drcfg: { handle: '.grab'},

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
      if (thing == 'str') result.push(link.name);
      else if (link.tags && link.tags.length) {
        for (var t = link.tags.length - 1; t >= 0; t--) {
          result.push(link.tags[t]);
        }
      }
    }
    return result;
  },

  filtered(filter, data, isBoard) {
    let pool = [];
    if (!filter.active) return false;
    if (isBoard && filter.by == 'board') pool = data.name
    if (isBoard && filter.by == 'tag') pool = this.find('tags', data.links)
    if (isBoard && filter.by == 'string') pool = this.find('str', data.links)

    if (!isBoard && filter.by == 'board') return false
    if (!isBoard && filter.by == 'tag') pool = data.tags
    if (!isBoard && filter.by == 'string') pool = data.name

    return this.compare(filter.key, pool);
  }
}

export default {
  install: function(Vue) {
    Vue.prototype.$$ = pd_util

    // autofocus
    Vue.directive('focus', { 
      inserted(el) { 
        let isInput = el.getAttribute('type') == 'text'
        return isInput ? el.focus() : el.querySelector('input').focus() 
      } 
    })
  }
}