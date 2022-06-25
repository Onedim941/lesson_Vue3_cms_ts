<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      :page-name="pageName"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
    />
    <PageContent
      :pageContentConfig="pageContentConfig"
      :page-name="pageName"
      ref="pageContentRef"
      @handleCreateClick="handleCreateClick"
      @handleEditClick="handleEditClick"
    />
    <pageModal
      :pageModalConfig="pageModalConfig"
      ref="pageModalRef"
      @handleConfirmClick="handleConfirmClick"
      :title="title"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'role'
}
</script>
<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import pageModal from '@/components/page-modal'

import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'

import { pageContentConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { pageModalConfig } from './config/modal.config'
import { ref } from 'vue'

const pageName = 'role'
const title = ref('')
const editModalTitle = '编辑角色信息'
const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch()

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

const {
  pageModalRef,
  handleCreateClick,
  handleConfirmClick,
  handleEditClick,
  defaultInfo
} = usePageModal(createCallback, editCallback)
</script>

<style lang="less" scoped></style>
