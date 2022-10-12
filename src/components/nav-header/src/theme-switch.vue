<!--
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-10-11 15:01:19
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-10-11 17:01:19
 * @FilePath: \vue3-cms-ts\src\components\nav-header\src\theme-switch.vue
 * @Description:
-->
<template>
  <div>
    <el-drawer v-model="settingDrawer" title="主题设置" @close="drawerClose">
      <div>
        <span>暗黑模式：</span>
        <el-switch v-model="switchValue" @click="toggleDark()" />
      </div>
      <div>
        <el-color-picker v-model="themeColor" />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { isDark, toggleDark } from '@/hooks/useDark'
import { right } from '@popperjs/core'
import { useCssVar } from '@vueuse/core'
import {
  computed,
  defineProps,
  ref,
  watchEffect,
  defineEmits,
  watch,
  onMounted
} from 'vue'

const props = defineProps<{
  drawer: boolean
}>()
const emit = defineEmits(['update:drawer'])

// 将传入的Drawer状态和本组件的Drawer状态绑定，并且改变时发射给父组件进行改变
const settingDrawer = ref(props.drawer)
watchEffect(() => {
  settingDrawer.value = props.drawer
})
const drawerClose = () => {
  emit('update:drawer', false)
}

// 是否暗黑模式
const switchValue = ref(isDark.value)

// 主题颜色
const themeColor = ref('')
watch(themeColor, (newValue, old) => {
  const el = document.documentElement
  const color = useCssVar('--el-color-primary', el)
  color.value = newValue
})
</script>

<style lang="less" scoped></style>
