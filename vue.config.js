const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/get_chat_response': {
        target: 'http://10.5.108.211:14000/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false
      },
    },
  }
})




