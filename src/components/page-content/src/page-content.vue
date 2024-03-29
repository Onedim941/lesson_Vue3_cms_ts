<template>
  <div class="page-content">
    <YxTable
      :data="list"
      :dataCount="dataCount"
      v-bind="pageContentConfig"
      v-model:page="pageInfo"
    >
      <!-- 头部插槽 -->
      <template #headerhandler>
        <el-button type="primary" v-if="isCreate" @click="handleCreateClick">{{
          pageContentConfig?.createBtnTitle
        }}</el-button>
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

      <!-- 插入剩余的动态的插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.props"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"> </slot>
        </template>
      </template>

      <!-- 操作栏的插槽 -->
      <template #handler="scope">
        <div class="handle-btn">
          <el-button
            size="small"
            type="text"
            :icon="Edit"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="text"
            :icon="Delete"
            class="del-btn"
            v-if="isDelect"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </YxTable>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits
} from 'vue'
import { useStore } from '@/store'
import YxTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'
import { ElMessageBox } from 'element-plus'
import { showMessage } from '@/utils/message'

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

const emit = defineEmits(['handleCreateClick', 'handleEditClick'])

// 获取用户拥有哪些权限
const isCreate = usePermission(props.pageName as string, 'create')
const isUpdate = usePermission(props.pageName as string, 'update')
const isDelect = usePermission(props.pageName as string, 'delete')
const isQuery = usePermission(props.pageName as string, 'query')

// 定义pageInfo数据
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => getPageData())

// 获取表格数据
const offset = computed(
  () => (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize
)
const size = computed(() => pageInfo.value.pageSize)
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  store.dispatch('systemModule/getUPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: offset.value,
      size: size.value,
      ...queryInfo
    }
  })
}
getPageData()
// 给表格传入数据
const list = computed(() =>
  store.getters['systemModule/pageListData'](props.pageName)
)
const dataCount = computed(() =>
  store.getters['systemModule/pageDataCount'](props.pageName)
)

/*
从config配置中遍历出除了公共插槽外的其他插槽，
这种动态插槽内容写在自己的页面里。最后传递到table组件中
如 goods(image插槽) -> pageContent(image) -> table(image)
*/
const commonSlot = ['enable', 'createTimeSlot', 'updateTimeSlot', 'handler']
const otherPropsSlots = props.pageContentConfig?.propsList.filter(
  (item: any) => {
    // 过滤公共需要的插槽`
    if (item.slotName && commonSlot.indexOf(item.slotName) === -1) return true
    return false
  }
)

// 处理删除点击
const handleDeleteClick = (item: any) => {
  ElMessageBox.confirm('此项数据将会被删除，确定操作吗', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.dispatch('systemModule/deletePageDataAction', {
      pageName: props.pageName,
      id: item.id,
      pageInfo: {
        offset: offset.value,
        size: size.value
      }
    })
  })
}

// 处理新建按钮点击
const handleCreateClick = () => {
  emit('handleCreateClick')
}

// 处理编辑点击
const handleEditClick = (item: any) => {
  console.log('row-', item)

  emit('handleEditClick', item)
}

defineExpose({ getPageData })
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 10px solid #f0f2f5;
  .handle-btn {
    .del-btn {
      color: red;
    }
  }
}

.dark .page-content {
  border-top: 10px solid var(--el-bg-color);
}
</style>
