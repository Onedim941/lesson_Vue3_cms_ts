<template>
  <div class="goods">
    <PageContent :pageContentConfig="pageContentConfig" :page-name="pageName">
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          fit="fill"
          preview-teleported="true"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #oldPrice="scope">
        <span>{{ '¥' + scope.row.oldPrice }}</span>
      </template>
      <template #newPrice="scope">
        <span>{{ '¥' + scope.row.newPrice }}</span>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
export default {
  name: 'goods'
}
</script>
<script lang="ts" setup>
import PageContent from '@/components/page-content'
import { pageContentConfig } from './config/content.config'

const pageName = 'goods'
</script>

<style scoped></style>
