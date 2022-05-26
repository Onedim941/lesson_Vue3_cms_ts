// const path = require('path')
const unpluginElementPlus = require('unplugin-element-plus/webpack')

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
      unpluginElementPlus({
        // options
      })
    ]
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
