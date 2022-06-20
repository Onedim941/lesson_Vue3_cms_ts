<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!collapse">Vue+TS</span>
    </div>
    <el-menu
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :default-active="defaultActiveMenu + ''"
      class="el-menu-vertical"
    >
      <!-- 二级菜单 -->
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <el-icon>
                <component :is="iconComponrnt(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 里面可以点击的item -->
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuClick(subitem.url)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import eventBus from '@/utils/eventBus'
import { pathMapToMenu } from '@/utils/map-menus'
import { computed, defineComponent, ref, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  emits: ['menuClick'],
  setup(props, { emit }) {
    const store = useStore()
    const router = useRouter()
    // 当前路由实例
    const route = useRoute()
    // computed 返回的是一个ref实例
    const userMenus = computed(() => store.state.loginModule.userMenus)

    // 返回图标组件
    const iconComponrnt = (name: string) => {
      return name.replace('el-icon', '')
    }

    const handleMenuClick = (url: string) => {
      emit('menuClick')
      router.push(url)
    }

    const currentPath = route.path

    const currentMenu = pathMapToMenu(userMenus.value, currentPath)

    const defaultActiveMenu = ref(currentMenu.id)
    // console.log('defaultActiveMenu', defaultActiveMenu.value)

    eventBus.on('routerChange', (id) => {
      defaultActiveMenu.value = id
    })

    // 销毁监听
    onBeforeUnmount(() => {
      eventBus.off('routerChange')
    })

    return {
      userMenus,
      iconComponrnt,
      handleMenuClick,
      defaultActiveMenu
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
