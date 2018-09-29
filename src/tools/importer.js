export default {
  install: function(Vue) {
    Vue.prototype.$importer = function(file) {
      return new Promise((resolve, reject) => {
        if (!file) return alert("No file uploaded!")

        let load = function(loaded) {
          let boards = {}

          // render the file as dummy DOM
          // this makes it easier to parse it?
          let dummy = document.createElement('html')
          dummy.innerHTML = loaded.target.result
          
          let bookmarks = dummy.getElementsByTagName('a')
          let isGeneric = function(str) {
            return str == "Bookmarks" || str == "Bookmarks Bar"
          }

          for (var i = bookmarks.length - 1; i >= 0; i--) {
            let el = bookmarks[i]
            let result = { tags: [] }
            let parent = el.closest('DL').previousElementSibling
            let cat = parent.innerText

            // loop through all parent folders
            // add any sub folders as tags
            while (parent.closest('DL')) {
              parent = parent.closest('DL').previousElementSibling
              if (!isGeneric(parent.innerText)) {
                result.tags.push(cat)
                cat = parent.innerText
              }
            }

            // if coming from a manager with tags
            let newTags = el.getAttribute('tags')
            if (newTags) result.tags = [ ...result.tags, ...newTags.split(',') ]

            // generate board if doesn't exist
            if (!boards[cat]) boards[cat] = { name: cat, links: [] }

            // add link to board
            result.link = el.href
            result.name = el.innerText ? el.innerText : el.href
            boards[cat].links.push(result)
          }

          resolve(boards)
        }

        let reader = new FileReader()
        reader.onload = load
        reader.readAsText(file)

      })
    }
  }
}