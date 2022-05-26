import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  msg: string
}

export interface IRootWithModule {
  loginModule: ILoginState
  systemModule: ISystemState
}

export type IStoreType = IRootWithModule & IRootState
