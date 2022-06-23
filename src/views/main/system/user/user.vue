<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
    />
    <PageContent :pageContentConfig="pageContentConfig" :pageName="pageName" />
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
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

const pageName = 'users'

// 处理form表单组件按钮点击
const handleSearchClick = (modelValue: any) => {
  console.log('handleSearchClick', modelValue)
}
const handleResetClick = () => {
  console.log('handleResetClick')
}
</script>

<style lang="less" scoped></style>
