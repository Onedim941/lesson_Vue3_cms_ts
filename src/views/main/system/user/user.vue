<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchClick="handleSearchClick"
      @resetClick="handleResetClick"
    />
    <el-table :data="userList" border style="width: 100%">
      <!-- <el-table-column prop="name" label="昵称" min-width="180" />
      <el-table-column prop="realname" label="真实名字" width="180" />
      <el-table-column prop="cellphone" label="电话号码" width="180" />
      <el-table-column prop="createAt" label="创建时间" width="180" /> -->
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import { useStore } from '@/store'

export default defineComponent({
  components: { PageSearch },
  setup() {
    const store = useStore()

    // 处理form表单组件按钮点击
    const handleSearchClick = (modelValue: any) => {
      console.log('handleSearchClick', modelValue)
    }
    const handleResetClick = () => {
      console.log('handleResetClick')
    }
    store.dispatch('systemModule/getUPageListAction', {
      url: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.systemModule.userList)
    const userCount = computed(() => store.state.systemModule.userCount)

    const propList = [
      { prop: 'name', label: '昵称', minWidth: '180' },
      { prop: 'realname', label: '真实名字', width: '180' },
      { prop: 'cellphone', label: '电话号码', width: '180' }
    ]

    return {
      searchFormConfig,
      handleSearchClick,
      handleResetClick,
      userList,
      propList
    }
  }
})
</script>

<style lang="less" scoped></style>
