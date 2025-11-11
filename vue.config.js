const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // Ensure 404.html and other public files are copied
  chainWebpack: config => {
    // The public folder files are automatically copied, but we ensure it here
    config.plugin('copy').tap(args => {
      return args
    })
  }
});
