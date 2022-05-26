<template>
  <el-form :model="account" :rules="rules" label-width="80px" ref="formRef">
    <el-form-item label="账号" prop="name" required>
      <el-input v-model.number="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input
        v-model="account.password"
        type="password"
        show-password
        autocomplete="off"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { defineComponent } from 'vue'
import { rules } from '../config/account-config'
import type { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    // 拿到vuex
    const store = useStore()

    // 初始化账号和密码
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.delectCache('name')
            localCache.delectCache('password')
          }
          store.dispatch('loginModule/accountLoginAction', { ...account })
        } else {
          console.log('验证失败')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
