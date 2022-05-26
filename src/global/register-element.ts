// import 'element-plus/lib/theme-chalk/base.css'
import { App } from 'vue'
// import { ElAlert, ElButton, ElTabs, ElTabPane, ElIcon } from 'element-plus'
// const components = [ElAlert, ElButton, ElTabs, ElTabPane, ElIcon]
// 注册icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册element组件
export default function (app: App): void {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
