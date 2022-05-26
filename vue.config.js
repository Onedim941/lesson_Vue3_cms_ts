// const path = require('path')
// const unpluginElementPlus = require('unplugin-element-plus/webpack')
// 自动按需导入elementui
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // 配置方式一： CLI提供的属性
  outputDir: './build',
  publicPath: './', // 加载资源路径 上线时不要使用
  // 配置方式二： 和webpack属性完全一致。最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/component'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    // 配置跨域
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }

  // 函数式配置
  // configureWebpack: (config) => {
  //   config.resolv.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/component"
  //   }
  // }

  // 配置方式三 链式
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('component', '@/component')
  // }
}
