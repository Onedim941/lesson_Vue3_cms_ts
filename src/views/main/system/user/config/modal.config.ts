import { IForm } from '@/base-ui/form'

export const pageModalConfig: IForm = {
  formItems: [
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
      fieid: 'password',
      type: 'password',
      label: '用户密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      fieid: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      fieid: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      options: []
    },
    {
      fieid: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
