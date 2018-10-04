let pd_util = {

  // find obj in array by id
  xById(arr, id) { return arr.findIndex((i) => i.id == id) },

  // make alert toast
  toasts: [],
  toasting: false,

  toast(message) {
    this.toasts.push(message);
    this.popup(this.toasts, this.popup);
  },

  popup(toasts, self) {
    let el = document.querySelector('#toast');

    if (toasts.length) {
      let message = `<p class="alert alert-info alert-border">
                       ${toasts.shift()}
                     </p>`;
      el.classList.add('active');
      el.innerHTML = message;
      if (!this.toasting) this.toasting = setTimeout(() => {
        this.toasting = false
        self(toasts, self)
      }, 2000)
    } else {
      el.classList.remove('active');
      el.innerHTML = '';
    }
  },

  // link opener
  openAll(links) {
    let allow = "You'll need to allow popups to use this feature!";
    let prefix = `You're trying to open ${links.length} links`;
    let tooMany = `${prefix}, try refining your search.`;
    let goAhead = `${prefix}, continue?`;

    let openArray = function(arr) {
      for (var i = 0; i < arr.length; i++) {
        let url = typeof arr[i].link === 'string' ? arr[i].link : arr[i];
        if (chrome.identity) {
          chrome.tabs.create({ url })
        } else {
          let newTab = window.open(url)
          try {
            newTab.focus()
          } catch (e) {
            this.toast(allow)
            break
          }
        }
      }
    }

    if (links.length > 20) return this.toast(tooMany);
    if (links.length < 5) return openArray(links);

    if (window.confirm(goAhead)) openArray(links)
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