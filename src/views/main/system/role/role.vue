<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent :pageContentConfig="pageContentConfig" :page-name="pageName" />
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { pageContentConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

const pageName = 'role'
</script>

<style lang="less" scoped></style>
