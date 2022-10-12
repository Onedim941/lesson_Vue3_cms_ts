<!--
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-06-26 21:40:56
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-09-08 15:22:20
 * @FilePath: \vue3-cms-ts\src\components\page-search\src\page-search.vue
 * @Description:
-->
<template>
  <div class="search">
    <yx-form v-bind="searchFormConfig" v-model="modelData">
      <template #footer>
        <div class="btns">
          <el-button icon="search" type="primary" @click="searchClick"
            >查询</el-button
          >
          <el-button icon="RefreshRight" @click="resetClick">重置</el-button>
        </div>
      </template>
    </yx-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import YxForm from '@/base-ui/form/index'
import { IModelData } from '../types'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: { YxForm },
  setup(props, { emit }) {
    const orginData: IModelData = {}
    for (const config of props.searchFormConfig.formItems ?? []) {
      orginData[config.fieid] = ''
    }
    const modelData = ref<IModelData>({ ...orginData })
    /*
        将modelData查询数据绑定一份到vuex，以便vuex查询数据的时候再获取使用
        待优化：1.其他地方获取查询数据的时候也直接从vuex获取，而不是emit发射出去
        2.pageInfo也绑定到vuex中。
    */
    const store = useStore()
    const changeQueryInfo = (pageName: string, queryInfo: IModelData) => {
      store.commit('systemModule/changeQueryInfo', {
        pageName,
        queryInfo
      })
    }
    changeQueryInfo(props.pageName as string, modelData.value)
    watch(
      () => modelData,
      (newValue) => {
        changeQueryInfo(props.pageName as string, newValue.value)
      },
      { deep: true }
    )

    // 点击搜索
    const searchClick = () => {
      emit('searchClick', modelData.value)
    }

    // 点击重置
    const resetClick = () => {
      for (const key in orginData) {
        modelData.value[key] = orginData[key]
      }
      emit('resetClick')
    }

    return {
      modelData,
      searchClick,
      resetClick
    }
  }
})
</script>

<style lang="less" scoped>
.btns {
  text-align: right;
  padding: 0px 40px 20px 0px;
}
</style>
