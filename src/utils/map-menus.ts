import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let fristMenu: any = null

export function mapMenusToRouters(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1. 先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context: webpack提供的读取文件的方法
  // 参数一：文件夹路径 参数二：是否递归查找该文件下所有的子文件  参数三： 需要查找的文件名后缀
  // 会返回一个对象，通过调用这个对象的keys方法拿到文件路径
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // 拿到文件路径后再调用webpack的require方法导入模块
    // key的值类似于 ./analysis/dashboard/dashboard.ts 需要切割之后做文件路径拼接
    const route = require('../router/main' + key.split('.')[1])
    // 此时拿到的就是文件模块了 就是一个个的内容
    // console.log('route', route)

    allRoutes.push(route.default)
  })
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 是可以点击的子菜单才加入
      if (menu.type === 2) {
        // 保存第一个默认子菜单  做第一次进来默认跳转用
        if (!fristMenu) {
          fristMenu = menu
        }
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  // 再根据后端给的菜单做匹配  需要动态添加哪些路由
  _recurseGetRoute(userMenus)
  // console.log('routes---', routes)
  return routes
}

// 匹配当前路径的菜单
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const currentMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (currentMenu) {
        breadcrumb?.push({ name: menu.name, path: menu.url, type: menu.type })
        breadcrumb?.push({
          name: currentMenu.name,
          path: currentMenu.url,
          type: currentMenu.type
        })
        return currentMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
// 面包屑
export function pathMapToBreadcrumb(
  userMenus: any[],
  currentPath: string
): any {
  const breadcrumb: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumb)
  return breadcrumb
}

// // 匹配当前路径的菜单
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const currentMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (currentMenu) {
//         return currentMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
// // 面包屑
// export function pathMapToBreadcrumb(
//   userMenus: any[],
//   currentPath: string
// ): any {
//   const breadcrumb: IBreadcrumb[] = []
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const currentMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (currentMenu) {
//         breadcrumb.push({ name: menu.name, path: menu.url })
//         breadcrumb.push({ name: currentMenu.name, path: currentMenu.url })
//         return currentMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumb
// }

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

// 只遍历出叶子节点进行设置
export function getMenuLeafKeys(menuList: any[]) {
  const meunIdList: number[] = []
  const _recurseMenuList = (menus: any[]) => {
    for (const item of menus) {
      if (item.children) {
        _recurseMenuList(item.children)
      } else {
        meunIdList.push(item.id)
      }
    }
  }
  _recurseMenuList(menuList)
  return meunIdList
}

export { fristMenu }
