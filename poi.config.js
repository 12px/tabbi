module.exports = (options, req) => ({
  entry: 'src/index.js',
  outDir: 'build/',

  // webpack
  publicPath: './',
  html: { title: "New Tab • pinnd" },

  // gets rid of duplicate compiler error
  webpack(config) {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    return config
  }
})