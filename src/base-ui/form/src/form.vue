<template>
  <div class="yx-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.lable">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 输入框input -->
              <!-- v-bind可以将配置的属性全部绑定到元素上 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-model="formData[`${item.fieid}`]"
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <!-- 选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[`${item.fieid}`]"
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="opt in item.options"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <!-- 时间选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.fieid}`]"
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    formItems: {
      // 表示的是formItems 是 IFormItem类型的数组
      type: Array as PropType<IFormItem[]>,
      // 数组或者对象写默认值的时候必须是箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6, // >1920 占位6份
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.yx-form {
  padding-top: 20px;
}
</style>
