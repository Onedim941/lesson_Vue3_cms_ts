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

interface IModelData {
  [key: string]: any
}

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      default: () => ({})
    }
  },
  components: { YxForm },
  setup(props, { emit }) {
    const orginData: IModelData = {}
    for (const config of props.searchFormConfig.formItems ?? []) {
      orginData[config.fieid] = ''
    }
    const modelData = ref<IModelData>({ ...orginData })

    const searchClick = () => {
      emit('searchClick', modelData.value)
    }

    const resetClick = () => {
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
