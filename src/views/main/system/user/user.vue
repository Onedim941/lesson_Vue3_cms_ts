<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
    />
    <PageContent
      :pageContentConfig="pageContentConfig"
      :pageName="pageName"
      ref="pageContentRef"
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
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

// 查询重置的hook
import { usePageSearch } from '@/hooks/usePageSearch'

const pageName = 'users'
const { pageContentRef, handleSearchClick, handleResetClick } = usePageSearch()
</script>

<style lang="less" scoped></style>
