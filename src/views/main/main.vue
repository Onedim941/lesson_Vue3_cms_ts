<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="collapse ? '60px' : '200px'">
        <NavMenu :collapse="collapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @changeFold="handlnChangeFold" />
        </el-header>
        <NavTab />
        <el-main class="page-content">
          <div class="content">
            <router-view v-slot="{ Component }">
              <keep-alive :include="keepAliveRoute">
                <component :is="Component"></component>
              </keep-alive>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'main'
}
</script>
<script lang="ts" setup>
import { computed, defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import NavTab from '@/components/nav-tab'
import { useStore } from '@/store'

const store = useStore()
const collapse = ref(false)
const handlnChangeFold = (isFold: boolean) => {
  collapse.value = isFold
}

// todo:给组件加上name以使用缓存
const keepAliveRoute = computed(() => setKeepAliveRoute())
const setKeepAliveRoute = () => {
  const registerRouterList = computed(
    () => store.state.loginModule.registerRouterList
  )
  const navTabList = computed(() => store.state.navTabModule.navTabList)
  const names: any[] = []
  registerRouterList.value.forEach((item) => {
    navTabList.value.forEach((nav) => {
      if (item.path === nav.url) {
        names.push(item.name)
      }
    })
  })
  console.log('names', names)

  return names
}
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 48px);

  .content {
    background-color: #fff;
    border-radius: 8px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
