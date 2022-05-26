import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YXRequestInterceptors, YXRequestConfig } from './types'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = true
class YXRequest {
  // axios实例 AxiosInstance类型是axios内部封装好的类型
  instance: AxiosInstance
  // 拦截器 类型就是YXRequestInterceptors
  interceptor?: YXRequestInterceptors
  loading: any
  showLoading: boolean

  constructor(config: YXRequestConfig) {
    // 为每个new出来的实例添加实例级别的拦截器
    this.instance = axios.create(config)
    this.interceptor = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptor?.responesInterceptor,
      this.interceptor?.responesInterceptorCatch
    )

    // 所有的实例都会有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '请稍等',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        this.showLoading = DEFAULT_LOADING
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        if (res.data.returnCode === '-1001') {
          console.log('失败')
        } else {
          return res
        }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404')
        }
        return err
      }
    )
  }

  request<T>(config: YXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个的拦截器 如果当前请求中有拦截器 就执行拦截器函数 并且返回新的config赋值  响应同理
      if (config?.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 单个请求是否需要loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 使用当前 axios.create 创建出来的实例去发送请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config?.interceptors?.responesInterceptor) {
            res = config.interceptors.responesInterceptor(res)
          }
          // 将showloading初始化 不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delect<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELECT' })
  }
  patch<T>(config: YXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YXRequest
