import { useDark, useToggle } from '@vueuse/core'

/*
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-10-11 14:54:07
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-10-11 15:15:39
 * @FilePath: \vue3-cms-ts\src\hooks\useDark.ts
 * @Description:
 */
export const isDark = useDark()
export const toggleDark = useToggle(isDark)
