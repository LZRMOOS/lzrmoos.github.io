// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//   ? '/vuejstest/'
//   : '/'
// };

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
};
