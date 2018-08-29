module.exports = (options, req) => ({
  entry: 'src/core/index.js',
  outDir: 'build/core/',
  staticFolder: 'src/static/',

  // webpack
  publicPath: './',
  html: { title: "New Tab • pinnd" },

  // gets rid of duplicate compiler error
  webpack(config) {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    return config
  }
})