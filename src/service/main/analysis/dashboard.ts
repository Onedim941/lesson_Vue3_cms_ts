import yxRequest, { request2 } from '@/service'
import { IDataType } from '@/service/types'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale',
  amountList = '/goods/amount/list'
}

export function getCategoryGoodsCount() {
  return yxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return yxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return yxRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return yxRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}

export function getAmountList() {
  return yxRequest.get<IDataType>({
    url: DashboardAPI.amountList
  })
}

// export function getVideo() {
//   return request2.get<IDataType>({
//     url: '/x/web-show/res/locs?pf=0&ids=5613'
//   })
// }
