import { App } from 'vue'
// 注册elementUI 老版
import registerElementIcon from './register-element'
import registerProperties from './register-properties'

export function registerApp(app: App): void {
  // 注册eleicon
  registerElementIcon(app)
  // 注册全局属性
  registerProperties(app)
}
