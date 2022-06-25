<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      destroy-on-close
      center
    >
      <YxForm v-bind="pageModalConfig" v-model="formData"></YxForm>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import YxForm from '@/base-ui/form'
import { ref, defineProps, watch, defineExpose, defineEmits } from 'vue'
import { IModelData } from '@/components/page-search/types'
import { log } from 'console'
import { useStore } from '@/store'

const props = defineProps({
  pageModalConfig: {
    type: Object,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    require: true
  }
})

const emit = defineEmits(['handleConfirmClick'])

// 1.初始化formitem
const formData = ref<IModelData>({})
// 2.当外部传入的default改变了说明是点击了编辑，此时改变绑定的
console.log('formData', formData.value)
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.pageModalConfig?.formItems) {
      formData.value[item.fieid] = newValue[item.fieid]
    }
    console.log('watch', formData.value)
  },
  { deep: true }
)

// 关于弹窗
const dialogVisible = ref(false)
// 创建一个改变dialog的函数供外部父组件调用
const changeDialog = (isShow: boolean) => {
  dialogVisible.value = isShow
}

// 新建弹窗确定
const store = useStore()
const handleConfirmClick = () => {
  // emit('handleConfirmClick', formData.value)
  if (Object.keys(props.defaultInfo).length) {
    // 如果长度不为0 说明是编辑
    store.dispatch('systemModule/editPageDataAction', {
      editData: { ...formData.value },
      pageName: props.pageName,
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('systemModule/createPageDataAction', {
      newData: { ...formData.value },
      pageName: props.pageName
    })
  }
  dialogVisible.value = false
}
defineExpose({ changeDialog })
</script>

<style lang="less" scoped></style>
