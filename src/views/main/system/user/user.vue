<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
      :pageName="pageName"
    />
    <PageContent
      :pageContentConfig="pageContentConfig"
      :pageName="pageName"
      ref="pageContentRef"
      @handleCreateClick="handleCreateClick"
      @handleEditClick="handleEditClick"
    />
    <pageModal
      :pageModalConfig="pageModalConfigRef"
      ref="pageModalRef"
      @handleConfirmClick="handleConfirmClick"
      :title="title"
      :pageName="pageName"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'user'
}
</script>
<script lang="ts" setup>
import { computed, defineComponent, reactive, ref, watch } from 'vue'

import { searchFormConfig } from './config/search.config'
import { pageContentConfig } from './config/content.config'
import { pageModalConfig } from './config/modal.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

// 查询重置的hook
import { usePageSearch } from '@/hooks/usePageSearch'
// 弹窗的hook
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

const pageName = 'users'
const title = ref('')
const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch()

// 打开弹窗前的回调函数
const createCallback = () => {
  title.value = '新建用户'
  const passwordItem = pageModalConfig.formItems.find(
    (item) => item.fieid === 'password'
  )
  passwordItem!.isHidden = false
}
const editCallback = () => {
  title.value = '编辑用户信息'
  const passwordItem = pageModalConfig.formItems.find(
    (item) => item.fieid === 'password'
  )
  passwordItem!.isHidden = true
}

// 动态添加option
// 使用computed函数包裹，为了使异步请求部门和角色菜单完成是，vuex数据发生改变，触发副作用，重新触发computed函数
// 重新返回配置文件，从而刷新选项组件
const store = useStore()
const pageModalConfigRef = computed(() => {
  const departmentItem = pageModalConfig.formItems.find(
    (item) => item.fieid === 'departmentId'
  )
  const roleItem = pageModalConfig.formItems.find(
    (item) => item.fieid === 'roleId'
  )
  departmentItem!.options = store.state.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  roleItem!.options = store.state.entireRole.map((item) => {
    return { label: item.name, value: item.id }
  })
  return pageModalConfig
})

const {
  pageModalRef,
  handleCreateClick,
  handleConfirmClick,
  handleEditClick,
  defaultInfo
} = usePageModal(createCallback, editCallback)
</script>

<style lang="less" scoped></style>
