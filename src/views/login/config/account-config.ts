export const rules = {
  name: [
    { required: true, message: '用户名必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名为5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码为5为以上字母或者数字',
      trigger: 'blur'
    }
  ]
}
