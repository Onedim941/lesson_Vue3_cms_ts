<!--
 * @Author: Onedim941 321610969@qq.com
 * @Date: 2022-06-26 21:38:32
 * @LastEditors: Onedim941 321610969@qq.com
 * @LastEditTime: 2022-10-11 16:59:49
 * @FilePath: \vue3-cms-ts\src\components\nav-tab\src\nav-tab.vue
 * @Description:
-->
<template>
  <div class="nav-tab">
    <ul class="nav-tab-list">
      <li
        v-for="(item, index) in navTabList"
        :key="item.url"
        class="nav-tab-item"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
        <div
          @click="handleClick(item)"
          :class="currentPath === item.url ? 'active-tab' : ''"
        >
          {{ item.name }}
        </div>
        <el-icon class="close-icon"
          ><Close
            @click="deleteTab(item, index)"
            v-if="currentIndex === index && navTabList.length > 1"
        /></el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'

const route = useRoute()
const router = useRouter()
const store = useStore()
const currentPath = computed(() => route.path)

// tab的列表
const navTabList = computed(() => store.state.navTabModule.navTabList)

// 鼠标移入
const currentIndex = ref(-1)
const handleMouseEnter = (index: number) => {
  currentIndex.value = index
}

// 鼠标移出
const handleMouseLeave = () => {
  currentIndex.value = -1
}

// 处理tab点击
const handleClick = (item: any) => {
  router.push(item.url)
}

// 删除tab
const deleteTab = (item: any, index: number) => {
  if (currentPath.value === item.url) {
    // 如果是删除第一个，则路由往后跳，否则就往前跳一位
    if (index === 0) {
      router.push(navTabList.value[index + 1].url)
    } else {
      router.push(navTabList.value[index - 1].url)
    }
  }
  navTabList.value.splice(index, 1)
}
</script>

<style lang="less" scoped>
.nav-tab {
  .nav-tab-list {
    display: flex;
    margin: 10px 0px;
    padding-left: 22px;
    font-size: 16px;
    font-weight: 400;
    .nav-tab-item {
      margin-right: 20px;
      cursor: pointer;
      display: flex;
      .close-icon {
        margin-left: 5px;
        color: #000000;
      }
    }
    .active-tab {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);
      padding-bottom: 5px;
    }
  }
}
</style>
