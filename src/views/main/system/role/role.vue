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
      :page-name="pageName"
      ref="pageModalRef"
      :title="title"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="entireMenu"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
          ref="treeRef"
        />
      </div>
    </pageModal>
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
import { computed, nextTick, ref } from 'vue'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'
import { getMenuLeafKeys } from '@/utils/map-menus'

interface ITree {
  name: string
  children?: ITree[]
}

const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch()

const store = useStore()
const pageName = 'role'
const title = ref('')
// 处理回调前后
const createCallback = () => {
  title.value = '新建角色'
}
const treeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  title.value = '编辑角色信息'
  const menuIdList = getMenuLeafKeys(item.menuList)
  console.log('menuIdList', menuIdList)
  // 处理角色菜单回显
  nextTick(() => {
    // 这里调用tree组件的方法需要放到nextTick里面去，
    // 因为直接使用的话弹窗里的tree组件在这个回调函数执行的时候还没生成出，所以需要放到下一帧执行

    treeRef.value?.setCheckedKeys(menuIdList, false)
  })
}

// 角色菜单
const entireMenu = computed(() => store.state.entireMenu)

// 弹窗相关hook
const { pageModalRef, handleCreateClick, handleEditClick, defaultInfo } =
  usePageModal(createCallback, editCallback)

const otherInfo = ref({})
const handleCheck = (data1: any, data2: any) => {
  // 拿到菜单id
  const { checkedKeys, halfCheckedKeys } = data2
  const menuList = [...halfCheckedKeys, ...checkedKeys]
  otherInfo.value = { menuList: menuList }
}
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
