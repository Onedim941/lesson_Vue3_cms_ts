<template>
  <div class="page-content">
    <YxTable :data="list" v-bind="pageContentConfig">
      <!-- 头部插槽 -->
      <template #headerhandler>
        <el-button type="primary">新建用户</el-button>
      </template>

      <!-- 列的插槽 -->
      <template #enable="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createTimeSlot="scope">
        <span>{{ $filters.formatUtcTime(scope.row.createAt) }}</span>
      </template>
      <template #updateTimeSlot="scope">
        <span>{{ $filters.formatUtcTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btn">
          <el-button size="small" type="text" :icon="Edit">编辑</el-button>
          <el-button size="small" type="text" :icon="Delete" class="del-btn"
            >删除</el-button
          >
        </div>
      </template>
    </YxTable>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { defineProps, computed } from 'vue'
import { useStore } from '@/store'
import YxTable from '@/base-ui/table'

const store = useStore()
const props = defineProps({
  pageContentConfig: {
    type: Object,
    require: true
  },
  pageName: {
    type: String,
    require: true
  }
})

// 获取表格数据
store.dispatch('systemModule/getUPageListAction', {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
})

const list = computed(() =>
  store.getters['systemModule/pageListData'](props.pageName)
)
const userCount = computed(() => store.state.systemModule.usersCount)
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 10px solid #f5f5f5;
  .handle-btn {
    .del-btn {
      color: red;
    }
  }
}
</style>
