// import 'element-plus/lib/theme-chalk/base.css'
import { App } from 'vue'
import { ElAlert, ElButton } from 'element-plus'
const components = [ElAlert, ElButton]

// 注册element组件
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
