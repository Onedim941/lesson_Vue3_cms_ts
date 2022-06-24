<template>
  <div class="goods">
    <PageContent
      :pageContentConfig="pageContentConfig"
      :page-name="pageName"
    ></PageContent>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Menu'
}
</script>
<script lang="ts" setup>
import PageContent from '@/components/page-content'
import { pageContentConfig } from './config/content.config'

const pageName = 'menu'
</script>

<style scoped></style>
