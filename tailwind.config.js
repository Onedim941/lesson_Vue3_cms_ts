/*
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-10-11 19:31:41
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-10-11 19:37:58
 * @FilePath: \vue3-cms-ts\tailwind.config.js
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts}'],
  content: [],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  },
  variants: {
    extend: {}
  },
  plugins: []
}
