// service 统一出口
import YXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const yxRequest = new YXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败拦截')
      return err
    },
    responesInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res.data
    },
    responesInterceptorCatch: (err) => {
      // console.log('响应失败拦截')
      return err
    }
  }
})

// 如果需要有多个baseUrl 多个请求实例
// const yxRequest2 = new YXRequest({
//   baseURL: '地址2'
// })

export const request2 = new YXRequest({
  baseURL: '/bilibili'
})

export default yxRequest
