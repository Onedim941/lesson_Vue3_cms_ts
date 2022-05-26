// 1.手动修改

// 2. 根据process.env.NODE_ENV 这个值会通过 definePlugin 根据不同环境注入不同的值
// 开发环境下：development
// 生产环境下：production
// 测试环境下：test
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://152.136.185.210:5000'
}

export { BASE_URL, TIME_OUT }
