import yxRequest from '../index'
import type { IAccount } from './types'
import type { ILoginResult } from '@/store/login/types'
import type { IDataType } from '../types'

enum LoginApi {
  // 登录
  AccountLogin = '/login',
  // 获取单个用户信息
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // 用法: role/{user}/meun
}

export function accountLoginRequest(account: IAccount) {
  return yxRequest.request<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    method: 'POST',
    data: account
  })
}

export function requestUserInfoById(id: number): Promise<any> {
  return yxRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number): Promise<any> {
  return yxRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
