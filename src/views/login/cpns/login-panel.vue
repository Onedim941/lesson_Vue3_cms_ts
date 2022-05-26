<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon class="ver-a-mid"><user-filled /></el-icon>
            <span class="ver-a-mid">账号登陆</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon class="ver-a-mid"><iphone /></el-icon>
            <span class="ver-a-mid">手机登录</span>
          </span>
        </template>
        <LoginPhone ref="LoginPhoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="control-account">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handlLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    const isKeep = ref(false)
    // 通过ref拿到子组件实例
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const LoginPhoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    const handlLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeep.value)
      } else {
        console.log('手机登录')
      }
    }
    return {
      isKeep,
      handlLoginClick,
      accountRef,
      currentTab,
      LoginPhoneRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 120px;
  .title {
    text-align: center;
  }
}
.control-account {
  margin-top: 12px;
  display: flex;

  justify-content: space-between;
}

.login-btn {
  margin-top: 10px;
  width: 100%;
}
.ver-a-mid {
  vertical-align: middle;
}
</style>
