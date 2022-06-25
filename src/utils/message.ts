import { ElMessage, ElMessageBox, MessageHandle } from 'element-plus'
import type {
  Action,
  MessageParams,
  ElMessageBoxOptions,
  ElMessageBoxShortcutMethod
} from 'element-plus'

export function showMessage(option?: MessageParams) {
  class message {
    private instance: any
    constructor(option?: MessageParams) {
      this.instance = ElMessage(option)
      return this.instance
    }
    success(option: MessageParams) {
      return ElMessage.success(option)
    }
    warning(option: MessageParams) {
      return ElMessage.warning(option)
    }
    error(option: MessageParams) {
      return ElMessage.error(option)
    }
  }
  return new message(option)
}

// export function showMessageBox(option?: ElMessageBoxOptions) {
//   class messageBox {
//     instance: any
//     constructor(option?: ElMessageBoxOptions) {
//       if (option) {
//         this.instance = ElMessageBox(option)
//         return this.instance
//       }
//     }
//     alert(option: any) {
//       return ElMessageBox.alert(option)
//     }
//     confirm(option: any) {
//       return ElMessageBox.confirm(option)
//     }
//     prompt(option: any) {
//       return ElMessageBox.prompt(option)
//     }
//   }
//   return new messageBox(option)
// }
