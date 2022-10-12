/*
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-06-28 01:14:23
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-09-22 16:53:55
 * @FilePath: \vue3-cms-ts\src\store\main\analysis\dashboard.ts
 * @Description:
 */
import { Module } from 'vuex'
import { IDashboard } from './types'
import { IRootState } from '@/store/types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getAmountList
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboard, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
      amountList: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    },
    changeAddAmountList(state, list) {
      state.amountList = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountRes = await getCategoryGoodsCount()
      const categoryGoodsSaleRes = await getCategoryGoodsSale()
      const categoryGoodsFavorRes = await getCategoryGoodsFavor()
      const addressGoodsSaleRes = await getAddressGoodsSale()
      const amountList = await getAmountList()
      commit('changeCategoryGoodsCount', categoryGoodsCountRes.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleRes.data)
      commit('changeCategoryGoodsFavor', categoryGoodsFavorRes.data)
      commit('changeAddressGoodsSale', addressGoodsSaleRes.data)
      commit('changeAddAmountList', amountList.data)
    }
  }
}

export default dashboardModule
