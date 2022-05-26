<template>
  <div class="login">
    <loginPane />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPane from './cpns/login-panel.vue'

export default defineComponent({
  components: { loginPane },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
