import axios from 'axios'
// promise是可以有类型的 使用泛型决定res类型
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log('res', res)
// })

// axios配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 1000
// ...

// 拦截器
// 拦截请求 fn1: 请求发送成功  fn2: 请求发送失败
axios.interceptors.request.use(
  (config) => {
    console.log('请求发送成功')
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)

// 响应拦截器 参数一fn 响应成功   参数二fn 响应失败
axios.interceptors.response.use(
  (res) => {
    console.log('成功')
    return res
  },
  (err) => {
    console.log('失败')
    return err
  }
)
