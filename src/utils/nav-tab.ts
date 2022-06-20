import store from '@/store'
import eventBus from './eventBus'
import { pathMapToMenu } from './map-menus'

function routerChange(path: string) {
  changeNavTabList(path)
}

function changeNavTabList(path: string) {
  // 暂时用这种方式解决外部使用store
  const useStore = store as any
  // 当前的tab菜单
  const navTabList = useStore.state.navTabModule.navTabList
  // 当前所有的路由数组
  const userMenus = useStore.state.loginModule.userMenus
  // 返回当前的url匹配的路由信息对象
  const menu = pathMapToMenu(userMenus, path)
  if (navTabList.findIndex((item: any) => item.url === path) === -1) {
    navTabList.push(menu)
    useStore.commit('changeNavTabList', navTabList)
  }
  // console.log('menu', menu)

  // 通知菜单改变
  eventBus.emit('routerChange', menu.id)
}

export default routerChange
