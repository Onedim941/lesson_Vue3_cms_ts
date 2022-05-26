type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 其他特殊选项
  otherOptions?: any
  fieid: string
}

export interface IFrom {
  formItems: IFormItem[]
  labelWidth?: string
  calLayout?: any
  itemLayout?: any
}
