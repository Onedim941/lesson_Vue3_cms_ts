import { IFrom } from '@/base-ui/form/index'

export const searchFormConfig: IFrom = {
  formItems: [
    {
      fieid: 'id',
      type: 'input',
      label: 'id',
      rules: [],
      placeholder: '请输入id'
    },
    {
      fieid: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      fieid: 'realname',
      type: 'input',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名'
    },
    {
      fieid: 'cellphone',
      type: 'password',
      label: '电话号码',
      rules: [],
      placeholder: '请输入电话号码'
    },
    {
      fieid: 'enable',
      type: 'select',
      label: '用户状态',
      rules: [],
      placeholder: '请选择用户状态',
      options: [
        {
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
        }
      ]
    },
    {
      fieid: 'createAt',
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
