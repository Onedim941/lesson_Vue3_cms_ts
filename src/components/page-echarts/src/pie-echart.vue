<template>
  <div class="pie-echart">
    <BaseEchart :option="options"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { EChartsOption } from 'echarts'
import { IEchartDataType } from '../types/types'
import { computed, defineProps, defineExpose } from 'vue'

const props = defineProps<{
  pieData: IEchartDataType[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

defineExpose({ options })
</script>

<style lang="less" scoped></style>
