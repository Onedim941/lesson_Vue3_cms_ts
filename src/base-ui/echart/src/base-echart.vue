<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
// 从echarts里导出所有的属性重命名为echarts
import * as echarts from 'echarts'
import { onMounted, ref, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { IInitOption } from '../types'
import { useEchart } from '../hooks/useEchart'

// ts里script setup语法定义props可以这样写类型  如果不加?：就是必传
// 通过withDefaults函数可以设置默认值 withDefaults(defineProps, 默认值)
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    theme?: string
    initOption?: IInitOption
    option: echarts.EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px',
    theme: '',
    initOption: () => ({ renderer: 'svg' })
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  // 需要使用非空断言
  const { setOptions } = useEchart(echartDivRef.value!)
  // 副作用函数  当props.option里的值更新时再调用setOption
  watchEffect(() => {
    setOptions(props.option)
  })
})
</script>

<style lang="less" scoped></style>
