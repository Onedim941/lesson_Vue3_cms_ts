<template>
  <div class="yx-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="heander">
          <slot name="headerhandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="data"
      v-bind="tableOption"
      @selection-change="headleSelectionChange"
      row-key="id"
      :treeprops="{ children: 'children' }"
    >
      <template v-for="item in propsList" :key="item.prop">
        <el-table-column v-if="item.select" type="selection"></el-table-column>
        <el-table-column
          v-else-if="item.sort"
          label="序号"
          type="index"
          v-bind="item"
        ></el-table-column>
        <el-table-column v-else v-bind="item">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['selectionChange', 'update:page'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  dataCount: {
    type: Number,
    default: 0
  },
  propsList: {
    type: Array as any,
    default: () => []
  },
  showIndexCloumn: {
    type: Boolean,
    default: false
  },
  showSelectCloumn: {
    type: Boolean,
    default: false
  },
  tableOption: {
    type: Object,
    default: () => ({})
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const headleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}

const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
</script>

<style lang="less" scoped>
.yx-table {
  .header {
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 10px 0px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
