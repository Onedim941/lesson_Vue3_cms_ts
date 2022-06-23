import { IFrom } from '@/base-ui/form/index'

export const searchFormConfig: IFrom = {
  formItems: [
    {
      fieid: 'username',
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
    },
    {
      fieid: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px'
}
