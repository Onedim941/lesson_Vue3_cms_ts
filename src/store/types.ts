import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { INavTab } from './main/nav-tab/types'

export interface IRootState {
  msg: string
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  navTabModule: INavTab
}

export type IStoreType = IRootWithModule & IRootState
