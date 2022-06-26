<template>
  <div class="user-info">
    <el-dropdown>
      <div class="info">
        <el-avatar
          size="small"
          url="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExits">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import LocalCache from '@/utils/cache'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.loginModule.userInfo.name)

    const router = useRouter()
    const handleExits = () => {
      LocalCache.delectCache('token')
      router.push('/login')
    }
    return {
      userName,
      handleExits
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  .info {
    display: flex;
    align-items: center;
  }
}
</style>
