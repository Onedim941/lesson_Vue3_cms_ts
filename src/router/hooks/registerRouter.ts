import type { Router } from 'vue-router'
import dashboard from '@/router/main/analysis/dashboard/dashboard'
import overview from '@/router/main/analysis/overview/overview'
import category from '@/router/main/product/category/category'
import goods from '@/router/main/product/goods/goods'
import chat from '@/router/main/story/chat/chat'
import list from '@/router/main/story/list/list'
import department from '@/router/main/system/department/department'
import menu from '@/router/main/system/menu/menu'
import role from '@/router/main/system/role/role'
import user from '@/router/main/system/user/user'

const routerObj = {
  dashboard,
  overview,
  category,
  goods,
  chat,
  list,
  department,
  menu,
  role,
  user
}

export function registerRouter(userMenus: any, router: Router) {
  // const routerFiles = require('../main/',true,)
  console.log('加载动态路由', userMenus)
  const addRouter: any[] = []
  userMenus.map((menu: any) => {
    menu.children.map((child: any) => {
      const routerNameArr: string[] = child.url.split('/')
      const name = routerNameArr[routerNameArr.length - 1]
      addRouter.push(routerObj[name as keyof typeof routerObj])
    })
  })
  console.log('addRouter', addRouter)
  addRouter.forEach((route) => {
    router.addRoute('main', route)
  })
}

// console.log(popupTypes[popupViewType]); // error 元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型
// //这样就好了
// let aaa = popupTypes[popupViewType as keyof typeof popupTypes];
// console.log(aaa);// aaa
