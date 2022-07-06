<template>
  <div class="yx-card">
    <el-card class="box-card">
      <template #header>
        <slot name="header">
          <div class="card-header">
            {{ title }}
          </div>
        </slot>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const func = () => {
  console.log('qweqwe')
}
defineExpose({ func })
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
</style>
