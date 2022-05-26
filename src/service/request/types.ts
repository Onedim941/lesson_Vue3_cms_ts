import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器类型
export interface YXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responesInterceptor?: (res: T) => T
  responesInterceptorCatch?: (err: any) => any
}

// 自定义一个接口 继承自AxiosRequestConfig 让config里可以传入自定义的拦截器
export interface YXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YXRequestInterceptors<T>
  showLoading?: boolean
}
