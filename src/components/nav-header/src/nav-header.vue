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
      <UserInfo />
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

export default defineComponent({
  emits: ['changeFold'],
  components: { UserInfo, YXBreadcrumb },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    let breadcrumbs = computed(() => {
      const userMenus = computed(() => store.state.loginModule.userMenus)
      const currentPath = route.path
      return pathMapToBreadcrumb(userMenus.value, currentPath)
    })

    return {
      handleFoldClick,
      isFold,
      breadcrumbs
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
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
