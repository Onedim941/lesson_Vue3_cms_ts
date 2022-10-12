<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { af, zhCn } from 'element-plus/lib/locale'

export default defineComponent({
  name: 'App',
  components: { ElConfigProvider },
  setup() {
    return {
      zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
li {
  list-style: none;
}
</style>
