module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true
      }
    }
  },
  baseUrl: 'public/web/',
  outputDir: '../websocket/app/public/web',
  filenameHashing: false
}
