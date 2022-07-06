import { Module } from 'vuex'
import { IDashboard } from './types'
import { IRootState } from '@/store/types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboard, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
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
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountRes = await getCategoryGoodsCount()
      const categoryGoodsSaleRes = await getCategoryGoodsSale()
      const categoryGoodsFavorRes = await getCategoryGoodsFavor()
      const addressGoodsSaleRes = await getAddressGoodsSale()
      console.log('categoryGoodsCountRes', categoryGoodsCountRes)
      commit('changeCategoryGoodsCount', categoryGoodsCountRes.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleRes.data)
      commit('changeCategoryGoodsFavor', categoryGoodsFavorRes.data)
      commit('changeAddressGoodsSale', addressGoodsSaleRes.data)
    }
  }
}

export default dashboardModule
