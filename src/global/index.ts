import { App } from 'vue'
// 注册elementUI 老版
import registerElementIcon from './register-element'

export function registerApp(app: App): void {
  registerElementIcon(app)
}
