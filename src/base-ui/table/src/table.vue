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
    <div class="footer">
      <slot name="footer">
        <!-- <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['selectionChange'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
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
  }
})

const headleSelectionChange = (value: any) => {
  emit('selectionChange', value)
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
}
</style>
