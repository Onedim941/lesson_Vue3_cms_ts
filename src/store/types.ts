import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { INavTab } from './main/nav-tab/types'
import { IDashboard } from './main/analysis/types'

export interface IRootState {
  msg: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
  navTabModule: INavTab
  dashboardModule: IDashboard
}

export type IStoreType = IRootWithModule & IRootState
