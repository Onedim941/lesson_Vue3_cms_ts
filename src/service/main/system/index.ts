import yxRequest from '@/service'
import type { IDataType } from '@/service/types'
import type { ISystemUserData } from './types'

export function getPageListData(url: string, queryInfo: any) {
  return yxRequest.post<IDataType<ISystemUserData>>({
    url,
    data: queryInfo
  })
}

// 删除数据
export function deletePageData(url: string) {
  return yxRequest.delete<IDataType>({
    url
  })
}
