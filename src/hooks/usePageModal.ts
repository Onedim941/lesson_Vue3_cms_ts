import { ref } from 'vue'
import pageModal from '@/components/page-modal'

type callBackFc = () => void
type editCb = (item: any) => void
// 传入两个回调函数，新建前的操作 编辑前的操作
export function usePageModal(createCb?: callBackFc, editCb?: editCb) {
  // 一个空的对象，用于之后装入编辑的数据formitem
  const defaultInfo = ref({})
  // 当前是否是编辑模式
  // const isEdit = ref(false)
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  // 新建按钮点击 弹窗
  const handleCreateClick = () => {
    // isEdit.value = false
    createCb && createCb()
    // 清除数据
    defaultInfo.value = {}
    pageModalRef.value?.changeDialog(true)
  }

  // 弹窗点击确定
  const handleConfirmClick = (formData: any) => {
    console.log('formData', formData)
  }

  // 点击编辑
  const handleEditClick = (item: any) => {
    // isEdit.value = true
    defaultInfo.value = { ...item }
    pageModalRef.value?.changeDialog(true)
    editCb && editCb(item)
  }
  return {
    pageModalRef,
    handleCreateClick,
    handleConfirmClick,
    handleEditClick,
    defaultInfo
  }
}
