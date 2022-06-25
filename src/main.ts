import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { setupStore } from './store'

// 引入全局注册函数
import { registerApp } from './global'

// 全局引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// console.log('全局环境变量', process.env.VUE_APP_BASE_URL)

const app = createApp(App)
registerApp(app)
app.use(store)
// 在匹配路由之前就把所有的路由注册好 这样刷新就不会404了
setupStore()
app.use(router)

// app.use(ElementPlus)
app.mount('#app')
