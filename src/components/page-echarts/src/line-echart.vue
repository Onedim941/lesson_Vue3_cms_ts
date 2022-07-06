<template>
  <div>
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
import { computed, defineProps, withDefaults } from 'vue'
import { IEchartDataType } from '../types/types'

const props = withDefaults(
  defineProps<{
    lineData: any[]
    xLabels: string[]
    title?: string
  }>(),
  {
    title: ''
  }
)

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    // toolbox: {
    //   feature: {
    //     saveAsImage: {}
    //   }
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.xLabels
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '分别销量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: props.lineData
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
