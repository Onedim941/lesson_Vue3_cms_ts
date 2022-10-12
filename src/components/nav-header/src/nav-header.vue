<!--
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-06-26 21:38:32
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-10-11 16:37:45
 * @FilePath: \vue3-cms-ts\src\components\nav-header\src\nav-header.vue
 * @Description:
-->
<template>
  <div class="nav-header">
    <el-icon
      @click="handleFoldClick"
      :class="[{ 'transfrom-icon': isFold }, 'icon']"
      :size="25"
      ><fold
    /></el-icon>
    <div class="content">
      <YXBreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo style="margin-left: auto" />
      <el-icon class="icon-setting" @click="() => (drawer = true)"
        ><Setting
      /></el-icon>
      <ThemeSwitch v-model:drawer="drawer" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import YXBreadcrumb, { IBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { pathMapToBreadcrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import ThemeSwitch from './theme-switch.vue'

export default defineComponent({
  emits: ['changeFold'],
  components: { UserInfo, YXBreadcrumb, ThemeSwitch },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    // 面包屑
    let breadcrumbs = computed(() => {
      const userMenus = computed(() => store.state.loginModule.userMenus)
      const currentPath = route.path
      return pathMapToBreadcrumb(userMenus.value, currentPath)
    })

    // 打开设置面板
    const drawer = ref(false)
    return {
      handleFoldClick,
      isFold,
      breadcrumbs,
      drawer
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  .icon {
    cursor: pointer;
  }
  .transfrom-icon {
    transform: rotate(180deg);
  }
  .content {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 5px;
  }
}

.icon-setting {
  margin-left: 5px;
}
.dark .icon-setting {
  color: var(--el-text-color-regular);
}
</style>
