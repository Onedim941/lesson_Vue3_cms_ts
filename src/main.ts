import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局注册函数
import { registerApp } from './global'
import yxRequest from './service'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

console.log('全局环境变量', process.env.VUE_APP_BASE_URL)

interface DateType {
  data: any
  returnCode: string
  success: boolean
}
yxRequest
  .request<DateType>({
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log('res', res)
  })

const app = createApp(App)
registerApp(app)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')
