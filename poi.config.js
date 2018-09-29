module.exports = (options, req) => ({
  entry: 'src/index.js',
  outDir: 'build/',
  staticFolder: 'src/static/',

  // webpack
  publicPath: './',
  html: { title: "New Tab • pinnd" },

  autoprefixer: {
    browsers: ['ie > 9', 'last 4 versions']
  },

  // gets rid of duplicate compiler error
  webpack(config) {
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'
    return config
  }
})