<template>
  <div>
    <el-form ref="ruleFormRef" :model="phone" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="number" required>
        <el-input v-model.number="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" required>
        <div class="getcode">
          <el-input v-model="phone.code" type="password" autocomplete="off" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
.getcode {
  display: flex;

  .el-button {
    margin-left: 8px;
  }
}
</style>
