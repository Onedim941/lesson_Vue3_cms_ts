import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 处理form表单组件按钮点击
  const handleSearchClick = (modelValue: any) => {
    pageContentRef.value?.getPageData(modelValue)
  }
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  return { pageContentRef, handleSearchClick, handleResetClick }
}
