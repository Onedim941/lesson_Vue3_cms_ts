import { IForm } from '@/base-ui/form'

export const pageModalConfig: IForm = {
  formItems: [
    {
      fieid: 'name',
      type: 'input',
      label: '角色名称',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      fieid: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
