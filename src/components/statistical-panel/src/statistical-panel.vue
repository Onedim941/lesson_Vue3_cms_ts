<template>
  <div class="statistical">
    <div class="top">
      <span class="title">{{ panelData.title }}</span>
      <el-tooltip effect="light" :content="panelData.tips" placement="top">
        <el-icon><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="center">
      <yxCountUp
        class="number"
        :number="panelData.number1"
        :options="panelData.amount === 'saleroom' ? { prefix: '￥' } : {}"
      ></yxCountUp>
    </div>
    <div class="footer">
      <span class="f-title">{{ panelData.title }}</span>
      <yxCountUp
        :number="panelData.number2"
        :options="panelData.amount === 'saleroom' ? { prefix: '￥' } : {}"
      ></yxCountUp>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import yxCountUp from '@/base-ui/countUp'
import type { IAmountList } from '@/views/main/analysis/dashboard/types/types'
const props = defineProps<{ panelData: IAmountList }>()

const centerOpt = {
  // 前缀
}
</script>

<style lang="less" scoped>
.statistical {
  background: white;
  padding: 20px 20px 10px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .title {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .center {
    text-align: left;
    margin: 12px 0px;
    .number {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .footer {
    text-align: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    padding-top: 10px;
    border-top: 1px solid #f0f0f0;
    letter-spacing: 1px;
    .f-title {
      margin-right: 5px;
    }
  }
}
</style>
