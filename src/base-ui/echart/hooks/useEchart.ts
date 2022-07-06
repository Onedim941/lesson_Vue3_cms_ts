import * as echarts from 'echarts'
import { IInitOption } from '../types'

// 注册中国地图
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

/*
  @params: el dom元素
  theme 主题
  initOption： 初始化选项
*/
export function useEchart(
  el: HTMLElement,
  theme?: string,
  initOption: IInitOption = { renderer: 'svg' }
) {
  // 初始化的echart实例
  const echartsInstance = echarts.init(el, theme, initOption)
  // 设置opt
  const setOptions = (option: echarts.EChartsOption) => {
    echartsInstance.setOption(option)
  }
  // 设置窗口缩放时改变大小
  const setResize = () => {
    echartsInstance.resize()
  }
  // 添加监听
  window.addEventListener('resize', setResize)
  // 移除监听
  const removeResize = () => {
    window.removeEventListener('resize', setResize)
  }
  return { echartsInstance, setOptions, setResize, removeResize }
}
