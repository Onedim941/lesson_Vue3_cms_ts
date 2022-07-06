<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <yxCard title="分类商品数量(饼图)">
          <PieEchart
            :pie-data="categoryGoodsCount"
            ref="PieEchartRef"
          ></PieEchart>
        </yxCard>
      </el-col>
      <el-col :span="10">
        <yxCard title="不同城市商品销量">
          <MapEchart :map-data="addressGoodsSale"></MapEchart>
        </yxCard>
      </el-col>
      <el-col :span="7">
        <yxCard title="分类商品数量(玫瑰图)">
          <RoseEchart :rose-data="categoryGoodsCount"></RoseEchart>
        </yxCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <yxCard title="分类商品的销量">
          <LineEchart
            :line-data="categoryGoodsSale.lineData"
            :x-labels="categoryGoodsSale.xLabels"
          ></LineEchart>
        </yxCard>
      </el-col>
      <el-col :span="12">
        <yxCard title="分类商品的收藏">
          <BarEchart
            :bar-data="categoryGoodsFavor.barData"
            :x-labels="categoryGoodsFavor.xLabels"
          ></BarEchart>
        </yxCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dashboard'
}
</script>
<script lang="ts" setup>
import { useStore } from '@/store'
import { computed, nextTick, onMounted, ref } from 'vue'
import yxCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

const store = useStore()
store.dispatch('dashboardModule/getDashboardDataAction')
// 饼图数据
const categoryGoodsCount = computed(() => {
  return store.state.dashboardModule.categoryGoodsCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
// 分类商品销量数据
const categoryGoodsSale = computed(() => {
  const lineData: any[] = []
  const xLabels: string[] = []
  const categoryGoods = store.state.dashboardModule.categoryGoodsSale
  for (const item of categoryGoods) {
    lineData.push(item.goodsCount)
    xLabels.push(item.name)
  }
  return { lineData, xLabels }
})

// 收藏数据
const categoryGoodsFavor = computed(() => {
  const barData: any[] = []
  const xLabels: string[] = []
  const categoryFavor = store.state.dashboardModule.categoryGoodsFavor
  for (const item of categoryFavor) {
    barData.push(item.goodsFavor)
    xLabels.push(item.name)
  }
  return { barData, xLabels }
})

// 城市销量数据
const addressGoodsSale = computed(() => {
  return store.state.dashboardModule.addressGoodsSale.map((item) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
