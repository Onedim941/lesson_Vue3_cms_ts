<template>
  <div>
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { computed, defineProps } from 'vue'
import { IEchartDataType } from '../types/types'

const props = defineProps<{
  barData: any[]
  xLabels?: string[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    // title: {
    //   text: '特性示例：渐变色 阴影 点击缩放',
    //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    // },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: props.barData
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
