<template>
  <span ref="countRef"></span>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, watch } from 'vue'
import { CountUp } from 'countup.js'
import type { CountUpOptions } from 'countup.js'

const props = defineProps<{
  number: number
  options?: CountUpOptions
}>()

const countRef = ref<HTMLElement>()
const countInstance = ref<CountUp>()

const defaultOpt: CountUpOptions = {
  startVal: 0,
  decimalPlaces: 0,
  duration: 9,
  useGrouping: true,
  separator: ','
}

const newOpt = Object.assign(defaultOpt, props.options)

onMounted(() => {
  if (!countRef.value) return
  countInstance.value = new CountUp(countRef.value!, props.number, newOpt)
  countInstance.value.start()
})

watch(
  () => props.number,
  (newValue) => {
    countInstance.value?.update(newValue)
  }
)
</script>

<style lang="less" scoped></style>
